import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateAdminById } from 'api/AdminApi';
import Swal from 'sweetalert2';

const UpdateAdminModal = ({ open, closeModal, refreshAdmins, selectedAdmin }) => {
  const [formData, setFormData] = useState({
    username: '',
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    is_staff: false,
    is_admin: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {

    if (selectedAdmin) {
      setFormData({
        username: selectedAdmin.username || '',
        last_name: selectedAdmin.last_name || '',
        first_name: selectedAdmin.first_name || '',
        email: selectedAdmin.email || '',
        password: '',
        is_staff: selectedAdmin.is_staff || false,
        is_admin: selectedAdmin.is_admin || false
      });
    }
  }, [selectedAdmin]);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      username: '',
      last_name: '',
      first_name: '',
      email: '',
      password: '',
      is_staff: false,
      is_admin: false
    });
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await updateAdminById(selectedAdmin._id, formData);
      refreshAdmins();
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
          }
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mise à jour de l'Agent Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Prénom"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nom"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Laisser vide pour conserver le mot de passe"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Membre du personnel"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Administrateur"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>Annuler</Button>
        <Button variant="primary" onClick={handleUpdate}>Mettre à jour</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAdminModal;