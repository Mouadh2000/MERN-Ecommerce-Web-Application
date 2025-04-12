import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addPaymentMethod } from 'api/PaymentMethodApi';

const AddPaymentMethodModal = ({ open, closeModal, refreshPaymentMethods }) => {
  const initialFormData = {
    name: '',
    description: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    closeModal();
  };

  const handleSave = async () => {
    try {
      await addPaymentMethod(formData);
      refreshPaymentMethods();
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Ajouter Nouvelle méthode de paiement</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Nom du méthode de paiement, Example : Carte Crédit"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" style={{ marginBottom: '15px' }}>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Form.Group controlId="formStatus" style={{ marginBottom: '15px' }}>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={{
                width: '100%',
                backgroundColor: formData.status === 'Active' ? 'green' : 'red',
                color: 'white',
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
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

export default AddPaymentMethodModal;
