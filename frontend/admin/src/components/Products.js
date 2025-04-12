import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import AddProductModal from "./Modals/ProductModal/AddProductModal";
import UpdateProductModal from "./Modals/ProductModal/UpdateProductModal";
import DeleteConfirmationModal from "./Modals/ProductModal/DeleteProductModal";
import { getAllProducts, deleteProductById } from "api/ProductApi";
import "../assets/css/sweetAlertStyle.css";
import Forbidden from "./Errors/Forbidden";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
      setIsForbidden(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error?.response?.status === 403) {
        setIsForbidden(true);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProductById(selectedProduct._id);
      fetchProducts();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
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
                <h3 className="text-white mb-0">Products</h3>
                <Col className="d-flex justify-content-end" xs="auto">
                  <Button color="primary" onClick={() => setIsModalOpen(true)}>
                    Ajouter Produit
                  </Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">nom du produit</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">nom du categorie</th>
                    <th scope="col">image du produit</th>
                    <th scope="col">Prix</th>
                    <th scope="col">rabais</th>
                    <th scope="col">quantité en stock</th>
                    <th scope="col">Avis</th>
                    <th scope="col">Crée le</th>
                    <th scope="col">Mise a jour le</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.status}</td>
                        <td>{product.category?.name}</td>
                        <td>
                          <img 
                            src={`data:image/jpeg;base64,${product.image}`} 
                            alt="Product" 
                            width="100" 
                            height="60" 
                            style={{ objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.price} DT</td>
                        <td>{product.discount}</td>
                        <td>{product.stock_quantity}</td>
                        <td>{product.rating}</td>
                        <td>{new Date(product.created_at).toLocaleDateString()}</td>
                        <td>{new Date(product.updated_at).toLocaleDateString()}</td>
                        <td>
                          <span 
                            style={{ cursor: "pointer", color: "green" }} 
                            onClick={() => handleEdit(product)}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            style={{ cursor: "pointer", color: "red", marginLeft: "10px" }} 
                            onClick={() => openDeleteModal(product)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center">No products found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <AddProductModal 
        open={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        refreshProducts={fetchProducts} 
      />
      <UpdateProductModal
        open={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
        product={selectedProduct}
        refreshProducts={fetchProducts}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Products;