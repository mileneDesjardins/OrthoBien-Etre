import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosContext } from "..";
import Button from "../components/Bouton";
import ModelePage from "../layout/ModelePage";

function PageInscription() {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      prenom: "",
      nom: "",
    },
  });

  // Faire inscription en enregistrant donnees dans bd
  const handleFormulaireInscription = handleSubmit((data) => {
    axios
      .post("/utilisateur/inscription", data)
      .then(function (response) {
        if (response.status === 200) {
          navigate("/connexion", { state: { status: "success" } });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  return (
    <ModelePage>
      <h1 className="d-flex justify-content-center">Création d'un compte</h1>
      <Container className="d-flex justify-content-center ">
        <Form onSubmit={handleFormulaireInscription}>
          <Stack style={{ width: "450px" }}>
            {/* Input EMAIL */}
            <Form.Group as={Col} controlId="courriel">
              <Form.Label>Courriel</Form.Label>
              <Form.Control
                type="email"
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

            {/* Input PRENOM */}
            <Form.Group as={Col} controlId="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
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

            {/* Input NOM */}
            <Form.Group as={Col} controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
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

            {/* Input MOT DE PASSE  */}
            <Form.Group as={Col} controlId="mdp">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                {...register("mdp", {
                  required: "Ce champ est obligatoire",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "error",
                  },
                })}
              />
              <p style={{ color: "red" }}>
                {errors.mdp?.message === "error" && (
                  <div>
                    <p>Le mot de passe doit contenir au moins:</p>
                    <ul>
                      <li>une lettre majuscule.</li>
                      <li>une lettre minuscule.</li>
                      <li>un chiffre.</li>
                      <li>un caractère spécial (@, $, !, %, *, ?, &).</li>
                      <li>6 caractères au minimum.</li>
                    </ul>
                  </div>
                )}
              </p>
            </Form.Group>

            <h5>Adresse</h5>
            {/* Input NUMERO CIVIQUE */}
            <Form.Group as={Col} controlId="numeroCivic">
              <Form.Label>Numéro civique</Form.Label>
              <Form.Control
                {...register("numeroCivic", {
                  minLength: {
                    value: 1,
                    message: "Longueur minimale est de 1 caractères",
                  },
                })}
              />
              <p style={{ color: "red" }}>{errors.numeroCivic?.message}</p>
            </Form.Group>

            {/* Input RUE */}
            <Form.Group as={Col} controlId="rue">
              <Form.Label>Rue</Form.Label>
              <Form.Control
                placeholder="Rue des violettes"
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
              }}
            >
              <Button type="submit" variant="outline-success">
                Créer un compte
              </Button>
            </div>
          </Stack>
        </Form>
      </Container>
    </ModelePage>
  );
}

export default PageInscription;
