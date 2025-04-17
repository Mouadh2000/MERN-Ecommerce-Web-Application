import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { getAllAdmins, deleteAdminById } from "api/AdminApi";
import AddAdminModal from "./Modals/AdminModal/AddAdminModal";
import UpdateAdminModal from "./Modals/AdminModal/UpdateAdminModal";
import DeleteConfirmationModal from "./Modals/AdminModal/DeleteAdminModal";
import Forbidden from "./Errors/Forbidden";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await getAllAdmins();
      setAdmins(response.data);
      setIsForbidden(false);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      if (error?.response?.status === 403) {
        setIsForbidden(true);
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedAdmin(null);
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;
    try {
      await deleteAdminById(selectedAdmin._id);
      fetchAdmins();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting admin:", error);
      if (error?.response?.status === 403) {
        setIsForbidden(true);
      }
    }
  };

  if (isForbidden) {
    return <Forbidden />;
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">Agent Support</h3>
                <Col className="d-flex justify-content-end" xs="auto">
                  <Button color="primary" onClick={openModal}>
                    Ajouter Agent Support
                  </Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Nom d'utilisateur</th>
                    <th scope="col">Email</th>
                    <th scope="col">Membre du personnel</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length > 0 ? (
                    admins.map((admin, index) => (
                      <tr key={index}>
                        <td>{admin.first_name}</td>
                        <td>{admin.last_name}</td>
                        <td>{admin.username}</td>
                        <td>{admin.email}</td>
                        <td>
                          <Badge
                            color={admin.is_staff ? "success" : "danger"}
                            className="p-2 fs-5"
                          >
                            {admin.is_staff ? "Oui" : "Non"}
                          </Badge>
                        </td>
                        
                        <td>
                          <span
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => handleEditClick(admin)}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                            onClick={() => openDeleteModal(admin)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Aucun administrateur trouvé.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Add Admin Modal */}
      <AddAdminModal
        open={isModalOpen}
        closeModal={closeModal}
        refreshAdmins={fetchAdmins}
      />

      {/* Update Admin Modal */}
      <UpdateAdminModal
        open={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        refreshAdmins={fetchAdmins}
        selectedAdmin={selectedAdmin}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Admins;