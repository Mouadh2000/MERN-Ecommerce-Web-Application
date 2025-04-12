import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import AddCategoryModal from "./Modals/CategoryModal/AddCategoryModal";
import UpdateCategoryModal from "./Modals/CategoryModal/UpdateCategoryModal";
import DeleteConfirmationModal from "./Modals/CategoryModal/DeleteCategoryModal";
import { getAllCategories, deleteCategoryById } from "api/CategoryApi";
import Forbidden from "./Errors/Forbidden";
import "../assets/css/sweetAlertStyle.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
      setIsForbidden(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      if (error?.response?.status === 403) {
        setIsForbidden(true);
      }
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCategory(null);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategoryById(selectedCategory._id);
      fetchCategories();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting category:", error);
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
                <h3 className="text-white mb-0">Categories</h3>
                <Col className="d-flex justify-content-end" xs="auto">
                  <Button color="primary" onClick={openAddModal}>Ajouter Categorie</Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nom categorie</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Crée le</th>
                    <th scope="col">mise a jour le</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">{category.name}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{category.description || "N/A"}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={category.status === "Active" ? "bg-success" : "bg-warning"} />
                            {category.status}
                          </Badge>
                        </td>
                        <td>{new Date(category.created_at).toLocaleDateString()}</td>
                        <td>{new Date(category.updated_at).toLocaleDateString()}</td>
                        <td>
                          <span
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => openUpdateModal(category)}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                            onClick={() => openDeleteModal(category)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune catégorie trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <AddCategoryModal open={isAddModalOpen} closeModal={closeAddModal} refreshCategories={fetchCategories} />
      <UpdateCategoryModal
        open={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        category={selectedCategory}
        refreshCategories={fetchCategories}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Category;