import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

const DeleteConfirmationModal = ({ isOpen, toggle, onDelete }) => {
    return (
      <Modal show={isOpen} onHide={toggle}>
        <ModalHeader closeButton>Delete Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this product?
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={onDelete}>Delete</Button>{' '}
          <Button variant="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
};

export default DeleteConfirmationModal;