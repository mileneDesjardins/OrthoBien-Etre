import React from "react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { convertToDataUrl } from "../utils";
import styles from "./Carte.module.css";
import ModalModification from "./ModalModification";
import ModalSupprimer from "./ModalSupprimer";

function CarteAdmin({ produit }) {
  const [modalModifShow, setModalModifShow] = React.useState(false);
  const [modalSupprimerShow, setModalSupprimerShow] = React.useState(false);

  return (
    <Card style={{ width: "18rem", textAlign: "center" }}>
      <div>
        <Card.Img
          className={styles["header-img"]}
          variant="top"
          src={produit.images && convertToDataUrl(produit.images[0])}
        />
        <h5>
          <Badge
            pill
            bg="danger"
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            {produit.promotion ? "En promotion" : ""}
          </Badge>
          <Badge
            pill
            bg="info"
            text="dark"
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
            }}
          >
            {produit.populaire ? "Produit populaire!" : ""}
          </Badge>
        </h5>
      </div>
      <Card.Body>
        <Card.Title>{produit.nomProduit}</Card.Title>
        <Button
          variant="outline-primary"
          onClick={() => setModalModifShow(true)}
        >
          Modifier
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="outline-danger"
          onClick={() => setModalSupprimerShow(true)}
        >
          Supprimer
        </Button>
      </Card.Body>
      <ModalModification
        produit={produit}
        show={modalModifShow}
        onHide={() => setModalModifShow(false)}
      />
      <ModalSupprimer
        produit={produit}
        show={modalSupprimerShow}
        onHide={() => setModalSupprimerShow(false)}
      />
    </Card>
  );
}

export default CarteAdmin;
