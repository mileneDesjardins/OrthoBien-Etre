import { useContext } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AxiosContext } from "..";

function ModalSupprimer({ produit, show, onHide }) {
  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const token = localStorage.getItem("token");

  const handleModalSupprimer = (e) => {
    e.preventDefault();
    const body = { codeProduit: produit.codeProduit, token };

    axios
      .delete("/supprimerProduit", { data: body })
      .then(function (response) {
        if (response.status === 200) {
          onHide();
          navigate("/admin", {
            state: {
              status: {
                type: "success",
                message: `Le produit est supprimé`,
              },
            },
          });
          navigate(0);
        } else {
          console.log("error");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      centered
    >
      <Modal.Header onClick={onHide} closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ alignContent: "center" }}
        >
          Suppression du produit: {produit.nomProduit}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleModalSupprimer}>
          <Container style={{ width: "400px" }}>
            <Stack>
              <Form.Label>
                Souhaitez-vous vraiment supprimer ce produit?
              </Form.Label>

              <Button
                type="submit"
                variant="danger"
                style={{ margin: "10px 0 0 0" }}
              >
                Oui
              </Button>
            </Stack>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSupprimer;
