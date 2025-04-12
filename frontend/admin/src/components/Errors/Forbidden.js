import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

const Forbidden = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card className="text-center shadow p-4">
            <Card.Body>
              <ExclamationTriangleFill color="orange" size={60} className="mb-3" />
              <Card.Title as="h1" className="display-4">403</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ACCÈS FORMELLEMENT INTERDIT</Card.Subtitle>
              <Card.Text>

                Vous n'avez pas la permission d'accéder à cette page.
              </Card.Text>
              <Button variant="primary" href="/">
              Retourner à la page d'accueil</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Forbidden;
