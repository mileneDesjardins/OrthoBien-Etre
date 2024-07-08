import { Card, Row } from "react-bootstrap";
import Etoile from "./Etoile";

function CarteCommentaire({ nomClient, commentaire, evaluation }) {
  return (
    <Row xs={1} md={4} className="g-4 justify-content-center">
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Etoile evaluation={evaluation} size="20px" />
          <Card.Title>{nomClient}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>{commentaire}</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default CarteCommentaire;
