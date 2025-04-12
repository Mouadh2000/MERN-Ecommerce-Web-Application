import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updatePaymentMethodById } from 'api/PaymentMethodApi';

const UpdatePaymentMethodModal = ({ open, closeModal, paymentMethod, refreshPaymentMethods }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    if (paymentMethod) {
      setFormData({
        name: paymentMethod.name,
        description: paymentMethod.description || '',
        isActive: paymentMethod.isActive,
      });
    }
  }, [paymentMethod]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'isActive' ? value === 'true' : value;
    setFormData({ ...formData, [name]: newValue });
  };
  

  const handleSave = async () => {
    try {
      await updatePaymentMethodById(paymentMethod._id, formData);
      refreshPaymentMethods();
      closeModal();
    } catch (error) {
      console.error('Error updating paymentMethod:', error);
    }
  };

  return (
    <Modal show={open} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier méthode de paiement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Control
              type="text"
              placeholder="Nom du méthode de paiement, Example: Carte Crédit"
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
              name="isActive"
              value={formData.isActive}
              onChange={handleInputChange}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
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

export default UpdatePaymentMethodModal;
