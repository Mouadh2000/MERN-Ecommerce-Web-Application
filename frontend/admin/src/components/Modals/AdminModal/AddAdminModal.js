import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createAdmin } from 'api/AdminApi';
import Swal from 'sweetalert2';

const AddAdminModal = ({ open, closeModal, refreshAdmins }) => {
  const initialFormData = {
    username: '',
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    is_staff: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    setErrors({});
    closeModal();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = "Le nom d'utilisateur est requis";
    if (!formData.first_name) newErrors.first_name = "Le prénom est requis";
    if (!formData.last_name) newErrors.last_name = "Le nom est requis";
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    try {
      await createAdmin({
        username: formData.username,
        last_name: formData.last_name,
        first_name: formData.first_name,
        email: formData.email,
        password: formData.password,
        is_staff: formData.is_staff,
      });
  
      refreshAdmins();
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };
  

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Ajouter un Agent Support</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Entrez le nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Entrez le prénom"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Entrez le nom"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Entrez l'email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Entrez le mot de passe"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            
          </Form.Group>

          <Form.Group controlId="formIsStaff" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Membre du personnel"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdminModal;