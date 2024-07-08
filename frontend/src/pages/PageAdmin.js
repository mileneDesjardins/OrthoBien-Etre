import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosContext, UserContext } from "..";
import CarteAdmin from "../components/CarteAdmin";
import ModalAjout from "../components/ModalAjout";
import ModelePage from "../layout/ModelePage";

function PageAdmin() {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const user = useContext(UserContext);
  const [produits, setProduits] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const { state } = useLocation();
  const status = state?.status;

  useEffect(() => {
    if (!user || user?.role !== "admin") {
      // TODO, faire une popup avant redirect
      navigate("/");
    }
  }, []);

  //// API call to fetch products
  useEffect(() => {
    axios
      .get("/Produits")
      .then(function (response) {
        // handle success
        setProduits(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [axios]);

  return (
    <ModelePage>
      <Stack
        className="d-flex flex-column align-items-center justify-content-center"
        gap={3}
      >
        {status?.type === "success" && (
          <Alert variant="success">
            <Alert.Heading>{status?.message}</Alert.Heading>
          </Alert>
        )}
        <h1 className="mb-2">Gestion des stocks</h1>

        <Button
          variant="outline-success"
          size="lg"
          onClick={() => setModalShow(true)}
        >
          Ajouter un produit
        </Button>
        <ModalAjout show={modalShow} onHide={() => setModalShow(false)} />

        <Container>
          <Row xs={1} md={4} className="g-4 justify-content-center">
            {produits
              .map((produit) => (
                <Col xs="auto" md="auto" key={produit._id}>
                  <CarteAdmin produit={produit} />
                </Col>
              ))
              .slice(0, 15)}
          </Row>
        </Container>
      </Stack>
    </ModelePage>
  );
}

export default PageAdmin;
