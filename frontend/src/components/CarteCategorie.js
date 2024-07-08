import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function CarteCategorie({ categorie: { img, nomCategorie, codeCategorie } }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/catalogue?filtreCategorie=${codeCategorie}`)}
      style={{
        width: "16rem",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Card.Body>
        <Card.Title className="mb-0">{nomCategorie}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CarteCategorie;
