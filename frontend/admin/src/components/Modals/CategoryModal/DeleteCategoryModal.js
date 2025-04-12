import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const DeleteConfirmationModal = ({ isOpen, toggle, onDelete }) => {
  return (
    <Modal show={isOpen} onHide={toggle}>
      <ModalHeader closeButton>Confirmation de suppression</ModalHeader>
      <ModalBody>
        Êtes-vous sûr de vouloir supprimer cette catégorie ?
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={onDelete}>Supprimer</Button>{' '}
        <Button variant="secondary" onClick={toggle}>Annuler</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
