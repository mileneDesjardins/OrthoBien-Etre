import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { React, useContext } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { UserContext } from "..";
import Checkout from "../components/PaypalCheckout";
import ModelePage from "../layout/ModelePage";
import { convertToDataUrl } from "../utils";

function PageCommande() {
  const location = useLocation();
  const user = useContext(UserContext);

  const cartItems = location.state.cartItems;
  const shippingInfos = location.state.shippingInfos;
  const cartItemsOrder = location.state.cartItems.map((item) => {
    const itemCart = {
      codeProduit: item.codeProduit,
      prix: item.prix,
      qtt: item.qtt,
      images: item.images,
    };
    return itemCart;
  });

  const totalAvantTaxes = location.state.total.toFixed(2);
  const tps = (totalAvantTaxes * (5 / 100)).toFixed(2);
  const tvq = (totalAvantTaxes * (9.975 / 100)).toFixed(2);
  const fraisLivraison = (totalAvantTaxes * (2 / 100)).toFixed(2);
  const totalApresTaxes = (
    Number(totalAvantTaxes) +
    Number(tvq) +
    Number(tps) +
    Number(fraisLivraison)
  ).toFixed(2);

  const isAClient = user ? true : false;

  const orderApprovedDetails = {
    orderId: "",
    paymentId: "",
    isClient: isAClient,
    shipping: shippingInfos,
    cart: cartItemsOrder,
    sousTotal: totalAvantTaxes,
    tps: tps,
    tvq: tvq,
    fraisLivraison: fraisLivraison,
    total: totalApresTaxes
  };

  return (
    <ModelePage>
      <Container>
        <h1>Récapitulatif de la commande</h1>
        <hr></hr>
        <div>
          <Row>
            <Col xs={8}>
              <Row>
                <h4> Details de la commande </h4>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <ListGroup variant="flush">
                      {cartItems.map((item) => (
                        <ListGroup.Item key={item.codeProduit}>
                          <Row style={{ textAlign: "center" }}>
                            <Col xs={3}>
                              <img
                                className="p-2"
                                style={{ width: "60px" }}
                                src={
                                  item.images &&
                                  convertToDataUrl(item.images[0])
                                }
                                alt="Produit"
                              />
                            </Col>
                            <Col xs={4}>
                              <h6
                                style={{ fontSize: "16px" }}
                                className="my-0 p-2"
                              >
                                {item.nomProduit}
                              </h6>
                            </Col>
                            <Col xs={5} className="text-muted">
                              <Row>
                                <span style={{ fontSize: "16px" }}>
                                  {item.prix?.toFixed(2)} CAD / Unité
                                </span>
                              </Row>
                              <Row>
                                <span style={{ fontSize: "14px" }}>
                                  Quantité: {item.qtt?item.qtt:1}
                                </span>
                              </Row>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AaI3aP2GIIHpPJp05ca6a380uZLugk_tJHJOEqh3JRWxVsSlLNrwxX3vSB82f4cb6iSpJJdCU4hVFreb",
                  currency: "CAD",
                }}
              >
                <Row className="p-2">
                  <h3>Passer la commande</h3>
                </Row>
                <Row>
                  <Col>
                    <Row className="p-1">Sous-Total:</Row>
                    <Row className="p-1">Frais de Livraison:</Row>
                    <Row className="p-1">TPS:</Row>
                    <Row className="p-1">TVQ:</Row>
                    <Row
                      className="fw-bolder p-1"
                      style={{ color: "#800020", borderTop: "solid lightGray" }}
                    >
                      TOTAL:
                    </Row>
                  </Col>
                  <Col className="">
                    <Row className="p-1 d-flex justify-content-end">
                      {totalAvantTaxes} CAD
                    </Row>
                    <Row className="d-flex justify-content-end p-1">
                      {fraisLivraison} CAD
                    </Row>
                    <Row className="d-flex justify-content-end p-1">
                      {tps} CAD
                    </Row>
                    <Row className="p-1 d-flex justify-content-end">
                      {tvq} CAD
                    </Row>
                    <Row
                      className="d-flex justify-content-end p-1 fw-bolder"
                      style={{ color: "#800020", borderTop: "solid lightGray" }}
                    >
                      {totalApresTaxes} CAD
                    </Row>
                  </Col>
                  <hr></hr>
                </Row>
                <Row className="">
                  <Checkout orderDetails={orderApprovedDetails} />
                </Row>
              </PayPalScriptProvider>
            </Col>
          </Row>
        </div>
      </Container>
    </ModelePage>
  );
}

export default PageCommande;
