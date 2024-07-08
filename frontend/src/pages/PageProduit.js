import { useContext, useEffect, useState } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AxiosContext } from "..";
import DetailsProduit from "../components/DetailsProduit";
import ModelePage from "../layout/ModelePage";

function PageProduit() {
  const axios = useContext(AxiosContext);
  const navigate = useNavigate();
  const { codeProduit } = useParams();
  const [produit, setProduit] = useState(null);
  const { state } = useLocation();
  const status = state?.status;

  // Fetch product from database
  useEffect(() => {
    if (!codeProduit) return;

    axios
      .get(`/produits/${codeProduit}`)
      .then(function (response) {
        // handle success
        setProduit(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response.status === 404) {
          navigate("/product-not-found");
        }
      })
      .finally(function () {
        // always executed
      });
  }, [axios, codeProduit]);

  return (
    <ModelePage>
      <Stack gap={3}>
        {status?.type === "success" && (
          <Alert variant="success">
            <Alert.Heading>{status?.message}</Alert.Heading>
          </Alert>
        )}

        {produit ? (
          <DetailsProduit produit={produit} />
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Stack>
    </ModelePage>
  );
}

export default PageProduit;
