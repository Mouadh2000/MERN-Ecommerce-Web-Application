import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getAllClients, deleteClientById, disableClientById, enableClientById } from "../api/ClientApi";
import DeleteConfirmationModal from "./Modals/ClientModal/DeleteClientModal";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  const openDeleteModal = (clients) => {
    setSelectedClient(clients);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedClient(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients();
        if (Array.isArray(response)) {
          setClients(response);
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClient = async () => {
    if (selectedClient) {
      try {
        await deleteClientById(selectedClient._id);
        setClients(clients.filter(client => client._id !== selectedClient._id));
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting Client:', error);
      }
    }
  };

  const handleToggleClientStatus = async (clientId, currentStatus) => {
    try {
      if (currentStatus) {
        // If currently disabled, enable the client
        await enableClientById(clientId);
        setClients(clients.map(client =>
          client._id === clientId ? { ...client, disabled: false } : client
        ));
      } else {
        // If currently enabled, disable the client
        await disableClientById(clientId);
        setClients(clients.map(client =>
          client._id === clientId ? { ...client, disabled: true } : client
        ));
      }
    } catch (error) {
      console.error('Error toggling client status:', error);
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Clients</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Nom d'utilisateur</th>
                    <th scope="col">Email</th>
                    <th scope="col">numéro de téléphone</th>
                    <th scope="col">genre</th>
                    <th scope="col">Addresse</th>
                    <th scope="col">est désactivé</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <th scope="row">{client.firstName}</th>
                      <td>{client.lastName}</td>
                      <td>{client.username}</td>
                      <td>{client.email}</td>
                      <td>{client.phoneNumber}</td>
                      <td>{client.gender}</td>
                      <td>{client.address}</td>
                      <td>
                        <Badge
                          onClick={() => handleToggleClientStatus(client._id, client.disabled)}
                          style={{
                            backgroundColor: client.disabled ? "red" : "green",
                            color: "white",
                            cursor: "pointer",
                          }}
                          className="text-uppercase"
                        >
                          {client.disabled ? "désactivé" : "activé"}
                        </Badge>
                      </td>
                      <td>
                        <span
                          onClick={() => openDeleteModal(client)}
                          style={{ cursor: "pointer", color: "red", marginLeft: '10px' }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        onDelete={handleDeleteClient}
      />
    </>
  );
};

export default Clients;