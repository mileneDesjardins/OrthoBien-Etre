import { useContext, useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSearchParams } from "react-router-dom";
import { AxiosContext } from "..";
import CarteProduit from "../components/CarteProduit";
import FiltreCatalogue from "../components/FiltreCatalogue";
import FiltreCategorie from "../components/FiltreCategorie";
import ModelePage from "../layout/ModelePage";

function PageCatalogue() {
  const axios = useContext(AxiosContext);

  const [searchParams] = useSearchParams();
  const [filtreCategorie, setFiltreCategorie] = useState(
    searchParams.get("filtreCategorie") || ""
  );
  const [produits, setProduits] = useState([]);
  const [filtre, setFiltre] = useState("");

  const [cart, setCart] = useState(
    localStorage.getItem("guestCartItems")
      ? JSON.parse(localStorage.getItem("guestCartItems"))
      : []
  );

  // Ajouter produit dans panier
  const handleAddToCart = (productDetails) => {
    let updatedCart = [];

    const existingProduct = cart.find(
      (item) => item.codeProduit === productDetails.codeProduit
    );

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.codeProduit === productDetails.codeProduit
          ? { ...item, qtt: item.qtt + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...productDetails, qtt: 1 }];
    }

    setCart(updatedCart);

    localStorage.setItem("guestCartItems", JSON.stringify(updatedCart));
  };

  // Filtrer par categories
  useEffect(() => {
    if (!!filtreCategorie) {
      axios.get(`/categories/${filtreCategorie}/produits`).then((response) => {
        setProduits(response.data);
      });
      return;
    }

    // sort by criterias
    axios.get(`/produits/${filtre}`).then((response) => {
      setProduits(response.data);
    });
  }, [axios, filtre, filtreCategorie]);

  return (
    <ModelePage>
      <Container>
        <Stack direction="horizontal" gap={2}>
          <FiltreCatalogue filtre={filtre} setFiltre={setFiltre} />
          <FiltreCategorie
            filtre={filtreCategorie}
            setFiltre={setFiltreCategorie}
          />
          <Button
            style={{ margin: "0px 0px 15px 0px" }}
            onClick={() => {
              setFiltre(""); // Réinitialise le filtre principal
              setFiltreCategorie(""); // Réinitialise le filtre de catégorie
            }}
          >
            Réinitialiser
          </Button>
        </Stack>
        <Row xs={1} md={4} className="g-4 justify-content-center">
          {produits
            .map((produit) => (
              <Col xs="auto" md="auto" key={produit._id}>
                <CarteProduit produit={produit} handleAddToCart={handleAddToCart} achat/>
              </Col>
            ))
            .slice(0, 15)}
        </Row>
      </Container>
    </ModelePage>
  );
}
export default PageCatalogue;
