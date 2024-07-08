import { React, useContext } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "..";
import Button from "../components/Bouton";
import ModelePage from "../layout/ModelePage";

const Livraison = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const totalAvantTaxes = location.state.total;
  const cartItems = location.state.cartItems;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  //Copie informations de livraison et les envoie à la page commande
  const handleformulaireLivraison = handleSubmit((data) => {
    navigate("/commande", {
      state: {
        total: totalAvantTaxes,
        cartItems: cartItems,
        shippingInfos: data,
      },
    });
  });

  return (
    <ModelePage>
      <Container>
        <h1>Insérer informations de livraison</h1>
        <hr></hr>
        <Form className=" mb-5" onSubmit={handleformulaireLivraison}>
          <Row>
            <Col xs={5} className="pe-5">
              <h4> Informations de l'acheteur </h4>
              <Form.Group className="mb-3 mx-auto" controlId="formBasicPrenom">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  value={user?.prenom}
                  {...register("prenom", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
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
              <Form.Group className="mb-3 mx-auto" controlId="formBasicNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  value={user?.nom}
                  {...register("nom", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
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
              <Form.Group className="mb-3 mx-auto" controlId="formBasicEmail">
                <Form.Label>Adresse courriel</Form.Label>
                <Form.Control
                  type="email"
                  name="courriel"
                  value={user?.courriel}
                  {...register("courriel", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:
                        "Veuillez respecter le format: 'nomutilisateur@domaine.com'",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.courriel?.message}</p>
              </Form.Group>
              <Form.Group className="mb-3 mx-auto" controlId="formBasicTel">
                <Form.Label>Numero de telephone</Form.Label>
                <Form.Control
                  type="tel"
                  value={user?.telephone}
                  placeholder="(000)-000-0000"
                  name="telephone"
                  {...register("telephone", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^\(\d{3}\)-\d{3}-\d{4}$/,
                      message: "Veuillez respecter le format: '(000)-000-0000'",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.telephone?.message}</p>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <h4> Adresse de livraison et de facturation </h4>
              <Row>
                <Col xs={4}>
                  <Form.Group
                    className="mb-3 mx-auto"
                    controlId="formBasicCivique"
                  >
                    <Form.Label>Numero civique</Form.Label>
                    <Form.Control
                      type="text"
                      name="civique"
                      value={user?.numeroCivic}
                      {...register("civique", {
                        required: "Ce champ est obligatoire",
                        pattern: {
                          value: /^[A-Za-z0-9\s.,-]+$/,
                          message: "Veuillez respecter le format",
                        },
                        minLength: {
                          value: 1,
                          message: "Longueur minimale est de 1 caractères",
                        },
                      })}
                    />
                    <p style={{ color: "red" }}>
                      {errors.numeroCivic?.message}
                    </p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 mx-auto"
                    controlId="formBasicStreet"
                  >
                    <Form.Label>Nom de la rue</Form.Label>
                    <Form.Control
                      type="text"
                      name="rue"
                      value={user?.rue}
                      {...register("rue", {
                        required: "Ce champ est obligatoire",
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
                </Col>
              </Row>

              <Form.Group className="mb-3 mx-auto" controlId="formBasicCity">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  type="text"
                  name="ville"
                  value={user?.ville}
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

              <Form.Group className="mb-3 mx-auto" controlId="formBasicZip">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="postal"
                  value={user?.codePostal}
                  {...register("postal", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
                      message: "Veuillez respecter ce format: 'V7X 1L7'",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.codePostal?.message}</p>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3 mx-auto"
                    controlId="formBasicProvince"
                  >
                    <Form.Label>Province</Form.Label>
                    <Form.Select
                      name="province"
                      value={user?.province}
                      {...register("province", {
                        required: "Veuillez choisir une option",
                      })}
                    >
                      <option>Québec</option>
                    </Form.Select>
                    <p style={{ color: "red" }}>{errors.province?.message}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3 mx-auto"
                    controlId="formBasicCountry"
                  >
                    <Form.Label>Pays</Form.Label>
                    <Form.Select
                      {...register("pays", {
                        required: "Veuillez choisir une option",
                      })}
                    >
                      <option>Canada</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <Button className="w-25" type="submit" variant="outline-primary">
              Continuer
            </Button>
          </Row>
        </Form>
      </Container>
    </ModelePage>
  );
};

export default Livraison;
