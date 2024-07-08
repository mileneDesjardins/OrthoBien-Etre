import React, { useContext } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosContext } from "..";
import Etoile from "./Etoile";

function FormulaireEvaluation({ codeProduit }) {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const token = localStorage.getItem("token");
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  // Ajouter avis dans base de donnee une fois complete
  const handleFormulaireEvaluation = handleSubmit((data) => {
    const body = { ...data, codeProduit, token };

    axios
      .post("/avis", body)
      .then(function (response) {
        if (response.status === 200) {
          navigate(0, {
            state: {
              status: {
                type: "success",
                message: `Votre évaluation client pour ce produit a bien été publiée.`,
              },
            },
          });
        }
      })
      .catch(function (error) {
        // handle error

        console.log("Impossible d'ajouter un commentaire");
      });
  });

  register("note", {
    value: 0,
  });

  return (
    <Container
      style={{
        alignContent: "space-around",
        textAlign: "center",
        maxWidth: "40%",
      }}
    >
      <h3 style={{ margin: "30px 0 0 0" }}>Créer une évaluation client</h3>

      <Stack gap={2}>
        <Form onSubmit={handleFormulaireEvaluation}>
          <h2 style={{ textAlign: "center" }}>{""}</h2>
          <Container
            style={{
              backgroundColor: "#80808014",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Card.Body>
              <Form.Group className="mb-3 mx-auto" controlId="note">
                <Card.Subtitle style={{ margin: "0 0 5px 0" }}>
                  Note globale
                </Card.Subtitle>
                <Etoile
                  size="30px"
                  onChange={(value) => setValue("note", value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto" controlId="commentaire">
                <Card.Subtitle style={{ margin: "15px 0 5px 0" }}>
                  Ajouter un commentaire
                </Card.Subtitle>
                <Form.Control
                  as="textarea"
                  placeholder="Écrirez votre commentaire ici..."
                  style={{ height: "100px" }}
                  {...register("commentaire", {
                    required: "Ce champ est obligatoire",
                  })}
                />
                <p style={{ color: "red" }}>{errors.commentaire?.message}</p>
              </Form.Group>

              <Button
                variant="secondary"
                type="submit"
                style={{ margin: "10px 0 0 0" }}
              >
                <Card.Subtitle>Soumettre</Card.Subtitle>
              </Button>
            </Card.Body>
          </Container>
        </Form>
      </Stack>
    </Container>
  );
}

export default FormulaireEvaluation;
