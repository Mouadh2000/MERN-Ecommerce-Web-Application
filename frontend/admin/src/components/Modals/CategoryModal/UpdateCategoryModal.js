import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateCategoryById } from 'api/CategoryApi';
const UpdateCategoryModal = ({ open, closeModal, category, refreshCategories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        status: category.status,
      });
    }
  }, [category]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateCategoryById(category._id, formData);
      refreshCategories();
      closeModal();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <Modal show={open} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Categorie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Control
              type="text"
              placeholder="nom du categorie"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategoryModal;
