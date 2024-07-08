import { useContext } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  ToggleButton,
} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosContext } from "..";
import FiltreCategorie from "./FiltreCategorie";

function ModalAjout({ show, onHide }) {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      codeCategorie: 1000,
    },
  });

  const radios = [
    { name: "Non", value: false },
    { name: "Oui", value: true },
  ];

  const handleModalAjout = handleSubmit((data) => {
    const body = { ...data, token };

    const formData = new FormData();
    for (const file of data.imageProduit) {
      formData.append("files", file);
    }
    Object.entries(body).forEach(([key, value], index) =>
      formData.append(key, value)
    );

    axios
      .post("/nouveauProduit", formData)
      .then(function (response) {
        if (response.status === 200) {
          onHide();
          navigate("/admin", {
            state: {
              status: {
                type: "success",
                message: `Le produit a bien été créé`,
              },
            },
          });
          navigate(0);
        } else {
          setError("backend", response?.data?.erreur);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setError("backend", { message: error.response?.data?.erreur });
      });
  });

  register("promotion", {
    value: false,
  });

  register("populaire", {
    value: false,
  });

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      centered
    >
      <Modal.Header onClick={onHide} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Création d'un nouveau produit
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleModalAjout}>
          <Container style={{ width: "400px" }}>
            <Stack>
              {/* Input CODE DU PRODUIT */}
              <Form.Group as={Col} controlId="codeProduit">
                <Form.Label>Code du produit:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("codeProduit", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^\d{4}$/,
                      message:
                        "Le code produit doit respecter un format de 4 chiffres",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.codeProduit?.message}</p>
                <p style={{ color: "red" }}>{errors.backend?.message}</p>
              </Form.Group>

              {/* Input IMAGE DU PRODUIT */}
              <Form.Group as={Col} controlId="imageProduit">
                <Form.Label>Ajout image(s):</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  {...register("imageProduit", {
                    required: "Ce champ est obligatoire",
                  })}
                />
                <p style={{ color: "red" }}>{errors.imageProduit?.message}</p>
              </Form.Group>

              {/* Input NOM DU PRODUIT */}
              <Form.Group as={Col} controlId="nomProduit">
                <Form.Label>Nom du produit:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("nomProduit", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\p'-]+$/,
                      message: "Lettres de l'alphabet uniquement",
                    },
                    minLength: {
                      value: 3,
                      message: "Longueur minimale est de 3 caractères",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.nomProduit?.message}</p>
                <p style={{ color: "red" }}>{errors.backend?.message}</p>
              </Form.Group>

              {/* Input NOM DE LA CATÉGORIE */}
              <Form.Group as={Col} controlId="nomCategorie">
                <Form.Label>Nom de la catégorie:</Form.Label>
                <FiltreCategorie
                  filtre={getValues("codeCategorie")}
                  setFiltre={(value) =>
                    setValue("codeCategorie", value, {
                      shouldValidate: true,
                    })
                  }
                />
              </Form.Group>

              {/* Input PETITE DESCRIPTION */}
              <Form.Group as={Col} controlId="pDescription">
                <Form.Label>Petite description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  {...register("pDescription", {
                    required: "Ce champ est obligatoire",
                    minLength: {
                      value: 5,
                      message: "Longueur minimale est de 5 caractères",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.pDescription?.message}</p>
              </Form.Group>

              {/* Input DESCRIPTION */}
              <Form.Group as={Col} controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  {...register("description", {
                    required: "Ce champ est obligatoire",
                    minLength: {
                      value: 20,
                      message: "Longueur minimale est de 20 caractères",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
              </Form.Group>

              {/* Input PRIX UNITAIRE */}
              <Form.Group as={Col} controlId="prix">
                <Form.Label>Prix unitaire:</Form.Label>
                <Form.Control
                  type="number"
                  step={0.01}
                  {...register("prix", {
                    required: "Ce champ est obligatoire",
                    valueAsNumber: true,
                    pattern: {
                      value: /^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/,
                      message:
                        "Veuillez entrer un nombre avec 2 decimales ex: '1,00'",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.prix?.message}</p>
              </Form.Group>

              {/* Input QUANTITE EN STOCK */}
              <Form.Group as={Col} controlId="quantite">
                <Form.Label>Quantité disponible:</Form.Label>
                <Form.Control
                  type="number"
                  {...register("quantite", {
                    required: "Ce champ est obligatoire",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "La quantité doit être d'au moins 1",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.quantite?.message}</p>
              </Form.Group>

              {/* Input POPULAIRE */}
              <Form.Group as={Col} controlId="populaire" />
              <Form.Label>Produit populaire:</Form.Label>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-populaire-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-primary" : "outline-secondary"}
                    name="radio-populaire"
                    value={radio.value}
                    checked={getValues("populaire") === radio.value}
                    onChange={(e) =>
                      setValue("populaire", e.currentTarget.value === "true", {
                        shouldValidate: true,
                      })
                    }
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>

              {/* Input EN PROMOTION */}
              <Form.Group as={Col} controlId="promotion"></Form.Group>
              <Form.Label>En promotion:</Form.Label>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-promotion${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-primary" : "outline-secondary"}
                    name="radio-promotion"
                    value={radio.value}
                    checked={getValues("promotion") === radio.value}
                    onChange={(e) =>
                      setValue("promotion", e.currentTarget.value === "true", {
                        shouldValidate: true,
                      })
                    }
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <p style={{ color: "red" }}>{errors.promotion?.message}</p>

              <Button
                type="submit"
                variant="success"
                style={{ margin: "10px 0 0 0" }}
              >
                Créer le produit
              </Button>
            </Stack>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAjout;
