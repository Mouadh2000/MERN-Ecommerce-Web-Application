import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Col,
  Badge,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import CtiCard from "../assets/img/cti-card.png";
import BhCard from "../assets/img/bh-card.png";
import EdinarCard from "../assets/img/carte_e-dinar_jeune.jpg";
import AddPaymentMethodModal from "./Modals/PaymentMethodModal/AddPaymentMethodModal";
import UpdatePaymentMethodModal from "./Modals/PaymentMethodModal/UpdatePaymentMethodModal";
import DeleteConfirmationModal from "./Modals/PaymentMethodModal/DeletePaymentMethodModal";
import { getAllPaymentMethods, deletePaymentMethodById } from "api/PaymentMethodApi";
import Forbidden from "./Errors/Forbidden";

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);

  const fetchPaymentMethods = async () => {
    try {
      const response = await getAllPaymentMethods();
      setPaymentMethods(response?.data || []);
      setIsForbidden(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des méthodes de paiement :", error);
      if (error?.response?.status === 403) {
        setIsForbidden(true);
      }
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openUpdateModal = (method) => {
    setSelectedPaymentMethod(method);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPaymentMethod(null);
  };

  const openDeleteModal = (method) => {
    setSelectedPaymentMethod(method);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPaymentMethod(null);
  };

  const handleDelete = async () => {
    if (!selectedPaymentMethod) return;
    try {
      await deletePaymentMethodById(selectedPaymentMethod._id);
      fetchPaymentMethods();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting payment method:", error);
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
          {[CtiCard, BhCard, EdinarCard].map((img, index) => (
            <div key={index} className="col-md-4">
              <img
                alt={`card-${index}`}
                src={img}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />
            </div>
          ))}
        </Row>

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">Méthodes de paiement</h3>
                <Col className="d-flex justify-content-end" xs="auto">
                  <Button color="primary" onClick={openAddModal}>
                    Ajouter une méthode
                  </Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Méthode de paiement</th>
                    <th scope="col">Description</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.length > 0 ? (
                    paymentMethods.map((method) => (
                      <tr key={method.id}>
                        <th scope="row">{method.name}</th>
                        <td>{method.description}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={method.isActive ? "bg-success" : "bg-warning"} />
                            {method.isActive ? "Activé" : "Désactivé"}
                          </Badge>
                        </td>
                        <td>
                          <span
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => openUpdateModal(method)}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                            onClick={() => openDeleteModal(method)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Aucune méthode trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      <AddPaymentMethodModal
        open={isAddModalOpen}
        closeModal={closeAddModal}
        refreshPaymentMethods={fetchPaymentMethods}
      />
      <UpdatePaymentMethodModal
        open={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        paymentMethod={selectedPaymentMethod}
        refreshPaymentMethods={fetchPaymentMethods}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Payments;