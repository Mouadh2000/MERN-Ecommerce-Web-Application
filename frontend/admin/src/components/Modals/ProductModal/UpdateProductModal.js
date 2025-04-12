import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateProductById } from 'api/ProductApi';
import { getAllCategories } from 'api/CategoryApi';
import Swal from 'sweetalert2';
import "../../../assets/css/sweetAlertStyle.css";


const UpdateProductModal = ({ open, closeModal, product, refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    category: '',
    price: '',
    discount: '',
    stock_quantity: '',
    image: null,
  });
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        status: product.status,
        category: product.category?._id || '',
        price: product.price,
        discount: product.discount,
        stock_quantity: product.stock_quantity,
        image: null,
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("uploadType", "product");
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && !value) return;
        formDataToSend.append(key, value);
      });
      
      await updateProductById(product._id, formDataToSend);
      refreshProducts();
      closeModal();
      
      Swal.fire({
        icon: "success",
        title: "Product updated successfully!",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update product",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Modal show={open} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Control as="select" name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formDiscount">
            <Form.Control type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formStock">
            <Form.Control type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label></Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
        Annuler</Button>
        <Button variant="primary" onClick={handleUpdate}>Modifier</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProductModal;