import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Row, Stack } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm } from "react-hook-form";
import { AxiosContext, UserContext } from "..";
import { useNavigate } from "react-router-dom";

function Onglets() {
  const axios = useContext(AxiosContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const user = useContext(UserContext);

  const [orderHistory, setOrderHistory] = useState([]);

  const handleOrderHistory = async () => {
    try {
      const response = await axios.get(`/commande/${user.courriel}`);
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    handleOrderHistory();
  }, [user]);

  return (
    <Tabs defaultActiveKey="profil" id="fill-tab-example" className="mb-3" fill>
      <Tab eventKey="profil" title="Profil">
        <Form onSubmit={() => null}>
          <Container style={{ width: "400px" }}>
            <Stack>
              {/* Input PRENOM */}
              <Form.Group as={Col} controlId="prenom">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.prenom || user?.prenomAdmin}
                  {...register("prenom", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ\s'\-]+$/,
                      message: "Lettres de l'alphabet uniquement",
                    },
                    minLength: {
                      value: 4,
                      message: "Longueur minimale est de 4 caractères",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.prenom?.message}</p>
              </Form.Group>
              {(!user || user?.role !== "admin") && (
                <div>
                  {/* Input NOM */}
                  <Form.Group as={Col} controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      value={user?.nom}
                      {...register("nom", {
                        required: "Ce champ est obligatoire",
                        pattern: {
                          value: /^[a-zA-ZÀ-ÿ\s'\-]+$/,
                          message: "Lettres de l'alphabet uniquement",
                        },
                        minLength: {
                          value: 4,
                          message: "Longueur minimale est de 4 caractères",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.nom?.message}</p>
                  </Form.Group>
                  {/* Input TELEPHONE */}
                  <Form.Group as={Col} controlId="telephone">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="(000)-000-0000"
                      name="telephone"
                      value={user?.telephone}
                      {...register("telephone", {
                        required: "Ce champ est obligatoire",
                        pattern: {
                          value: /^\(\d{3}\)-\d{3}-\d{4}$/,
                          message:
                            "Veuillez respecter le format: '(000)-000-0000'",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.telephone?.message}</p>
                  </Form.Group>

                  <h5>Adresse</h5>
                  {/* Input NUMERO CIVIQUE */}
                  <Form.Group as={Col} controlId="civique">
                    <Form.Label>Numéro civique</Form.Label>
                    <Form.Control
                      value={user?.numeroCivic}
                      {...register("civique", {
                        minLength: {
                          value: 1,
                          message: "Longueur minimale est de 1 caractères",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.civique?.message}</p>
                  </Form.Group>

                  {/* Input RUE */}
                  <Form.Group as={Col} controlId="rue">
                    <Form.Label>Rue</Form.Label>
                    <Form.Control
                      value={user?.rue}
                      type="text"
                      {...register("rue", {
                        pattern: {
                          value: /^[0-9a-zA-ZÀ-ÿ\s\-',.()]+$/,
                        },
                        minLength: {
                          value: 4,
                          message: "Longueur minimale est de 4 caractères",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.rue?.message}</p>
                  </Form.Group>

                  {/* Input VILLE */}
                  <Form.Group as={Col} controlId="ville">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                      value={user?.ville}
                      type="text"
                      {...register("ville", {
                        required: "Ce champ est obligatoire",
                        pattern: {
                          value: /^[0-9a-zA-ZÀ-ÿ\s\-',.()]+$/,
                          message: "Lettres de l'alphabet uniquement",
                        },
                        minLength: {
                          value: 4,
                          message: "Longueur minimale est de 4 caractères",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.ville?.message}</p>
                  </Form.Group>

                  {/* Input PROVINCE */}
                  <Form.Group as={Col} controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Select
                      value={user?.province}
                      {...register("province", {
                        required: "Veuillez choisir une option",
                      })}
                    >
                      <option>Québec</option>
                      <option>Ontario</option>
                      <option>Alberta</option>
                      <option>Colombie-Britannique</option>
                      <option>Manitoba</option>
                      <option>Nouveau-Brunswick</option>
                      <option>Nouvelle-Écosse</option>
                      <option>Saskatchewan</option>
                      <option>Terre-Neuve-et-Labrador</option>
                    </Form.Select>
                    <p style={{ color: "red" }}>{errors.province?.message}</p>
                  </Form.Group>

                  {/* Input CODE POSTAL */}
                  <Form.Group as={Col} controlId="codePostal">
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control
                      value={user?.codePostal}
                      type="text"
                      {...register("codePostal", {
                        required: "Ce champ est obligatoire",
                        pattern: {
                          value: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
                          message: "Veuillez respecter ce format: 'V7X 1L7'",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>{errors.codePostal?.message}</p>
                  </Form.Group>
                </div>
              )}
            </Stack>
          </Container>
        </Form>
      </Tab>
      {(!user || user?.role !== "admin") && (
        <Tab eventKey="commandes" title="Historique des commandes">
          <Container style={{ width: "1000px" }}>
            <Stack>
              <ListGroup variant="flush">
                {orderHistory &&
                  orderHistory.reverse().map((item) => (
                    <ListGroup.Item mb={2} key={item.orderId}>
                      <Stack direction="vertical" gap={1}>
                        <Row>
                          <h5>
                            Commande de: {item.shippingInfos.prenomClient}{" "}
                            {item.shippingInfos.nomClient}
                          </h5>
                        </Row>
                        <Row>
                          <Col xs={4}>
                            <h6>
                              Adresse: {item.shippingInfos.adresse.numeroCivic}{" "}
                              {item.shippingInfos.adresse.rue}{" "}
                              {item.shippingInfos.adresse.cp}{" "}
                              {item.shippingInfos.adresse.ville}
                            </h6>
                            <h6>Telephone: {item.shippingInfos.tel}</h6>
                            <h6> Date Commande: {item.orderDate}</h6>
                          </Col>
                          <Col xs={4}>
                            <h6>Id Commande: {item.orderId}</h6>
                            <h6>Courriel: {item.shippingInfos.courriel}</h6>
                            <h6> Date Livraison: {item.deliveryDate}</h6>
                          </Col>
                          <Col xs={3}>
                            <h6>Status: {item.status}</h6>
                            <h6>Total: ${item.total} </h6>
                            <h6> Paiement: Paypal</h6>
                          </Col>
                        </Row>
                      </Stack>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Stack>
          </Container>
        </Tab>
      )}
    </Tabs>
  );
}

export default Onglets;
