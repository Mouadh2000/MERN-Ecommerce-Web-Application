// NotFound.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { EmojiFrown } from 'react-bootstrap-icons';

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card className="text-center shadow p-4">
            <Card.Body>
              <EmojiFrown color="gray" size={60} className="mb-3" />
              <Card.Title as="h1" className="display-4">404</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Page introuvable
              </Card.Subtitle>
              <Card.Text>
                Oups ! La page que vous cherchez n'existe pas.
              </Card.Text>
              <Button variant="secondary" href="/">Retourner à la page d'accueil</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
