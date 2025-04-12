import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addProduct } from 'api/ProductApi';
import { getAllCategories } from 'api/CategoryApi';
import Swal from 'sweetalert2';

const AddProductModal = ({ open, closeModal, refreshProducts }) => {
  const initialFormData = {
    name: '',
    description: '',
    status: 'Active',
    category: '',
    price: '',
    discount: '',
    stock_quantity: '',
    image: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success && Array.isArray(response.data)) {
          setCategories(response.data); // Use response.data, not response
        } else {
          setCategories([]); // Ensure categories is always an array
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Handle error gracefully
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

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    closeModal();
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("uploadType", "product");
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && !value) return; // Skip appending image if not selected
        formDataToSend.append(key, value);
      });
  
  
      await addProduct(formDataToSend);
      refreshProducts();
      resetFormAndCloseModal();
      
      Swal.fire({
        icon: "success",
        title: "Product added successfully!",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };
  

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter Produit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="nom du produit"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription" style={{ marginBottom: '15px' }}>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory" style={{ marginBottom: '15px' }}>
            <Form.Label>Categorie</Form.Label>
            <Form.Control as="select" name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPrice" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="Prix"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDiscount" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="rabais (%)"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formStock" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="quantité en stock"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImage" style={{ marginBottom: '15px' }}>
            <Form.Label>image du produit</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregister
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
