import { default as React, useContext, useState } from "react";
import { Alert, Badge, Button, Card, Row, Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "..";
import { calculMoyenneAvis, convertToDataUrl } from "../utils";
import styles from "./Carte.module.css";
import Etoile from "./Etoile";
import NomCategorie from "./NomCategorie";

const CarteProduit = (props) => {
  const produitDetails = {
    codeProduit: props.produit.codeProduit,
    nomProduit: props.produit.nomProduit,
    codeCategorie: props.produit.codeCategorie,
    prix: props.produit.prix,
    promotion: props.produit.promotion,
    populaire: props.produit.populaire,
    images: props.produit.images,
    avis: props.produit.avis,
  };

  const navigate = useNavigate();

  const user = useContext(UserContext);

  const [notification, setNotification] = useState(null);

  const displayNotification = () => {
    setNotification(`${produitDetails.nomProduit} a été ajouté au panier`);

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const prixInitial = produitDetails.prix || 0;
  const prixBarre = produitDetails.promotion
    ? (prixInitial * 1.15).toFixed(2)
    : "";

  return (
    <Card
      style={{
        width: "18rem",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      {notification && (
        <Alert
          variant="success"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          {notification}
        </Alert>
      )}

      <div
        style={{ position: "relative", display: "inline-block" }}
        onClick={() => navigate(`/produit/${produitDetails.codeProduit}`)}
      >
        <Card.Img
          className={styles["header-img"]}
          variant="top"
          src={
            produitDetails.images && convertToDataUrl(produitDetails.images[0])
          }
        />
        <h5>
          <Badge
            pill
            bg="danger"
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            {produitDetails.promotion ? "En promotion" : ""}
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
            {produitDetails.populaire ? "Produit populaire!" : ""}
          </Badge>
        </h5>
      </div>

      <Card.Body
        onClick={() => navigate(`/produit/${produitDetails.codeProduit}`)}
      >
        <Card.Title className="mb-0  p-2">
          {produitDetails.nomProduit}
        </Card.Title>
        <Row>
          {produitDetails.codeCategorie && (
            <NomCategorie codeCategorie={produitDetails.codeCategorie} />
          )}
        </Row>
        <Stack direction="horizontal">
          {produitDetails.promotion ? (
            <>
              <ListGroup.Item
                className="mx-auto"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {produitDetails.prix.toFixed(2)} CAD
              </ListGroup.Item>
              {prixBarre && (
                <ListGroup.Item className="mx-auto">
                  <del>{prixBarre} CAD</del>
                </ListGroup.Item>
              )}
            </>
          ) : (
            prixInitial && (
              <ListGroup.Item className="mx-auto">
                {prixInitial.toFixed(2)} CAD
              </ListGroup.Item>
            )
          )}
        </Stack>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Etoile
            evaluation={
              produitDetails.avis && calculMoyenneAvis(produitDetails.avis)
            }
            size="25"
          />

          <Card.Link href="#commentaires">
            ({produitDetails.avis.length})
          </Card.Link>
        </div>
      </Card.Body>
      <Row className="p-2 mb-3">
        <Stack
          direction="horizontal"
          gap={1}
          style={{ justifyContent: "center" }}
        >
          {(!user || user?.role !== "admin") && (
            <div>
              <Button
                variant="outline-primary"
                onClick={() => {
                  props.handleAddToCart &&
                    props.handleAddToCart(produitDetails);
                  displayNotification();
                }}
                style={{ margin: "5px" }}
              >
                Ajout Panier
              </Button>

              <Button
                variant="outline-success"
                onClick={() =>
                  navigate("/commande", {
                    state: {
                      total: produitDetails.prix,
                      cartItems: [produitDetails],
                    },
                  })
                }
              >
                Achat Rapide
              </Button>
            </div>
          )}
        </Stack>
      </Row>
    </Card>
  );
};

export default CarteProduit;
