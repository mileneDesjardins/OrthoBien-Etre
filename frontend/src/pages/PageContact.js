import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModelePage from "../layout/ModelePage";

function PageContact() {
  const adresseCourriel = "orthobienetre-info@gmail.com";

  return (
    <ModelePage>
      <Container className="py-5">
        <h1 className="text-center mb-4">Contactez-nous</h1>
        <Row className="justify-content-center">
          <Col md={6} className="mb-4">
            <div className="border p-4">
              <h3 className="mb-3">Notre bureau</h3>
              <p>456 rue des Laurentides,</p>
              <p>Montréal, Québec H7K 9H7</p>
              <p>Canada</p>
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="border p-4">
              <h3 className="mb-3">Information</h3>
              <p>
                Email:{" "}
                <a href={`mailto:${adresseCourriel}`}>{adresseCourriel}</a>
              </p>
              <p>Téléphone: 1-800-123-4567</p>
              <p>Nous sommes disponibles du lundi au vendredi, de 8h à 17h.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </ModelePage>
  );
}

export default PageContact;
