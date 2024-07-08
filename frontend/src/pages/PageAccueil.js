import { useContext, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AxiosContext, UserContext } from "..";
import Carrousel from "../components/CarrouselAccueil";
import CarteCategorie from "../components/CarteCategorie";
import CarteProduit from "../components/CarteProduit";
import ModelePage from "../layout/ModelePage";

function PageAccueil() {
  const axios = useContext(AxiosContext);
  const user = useContext(UserContext);

  const [promotions, setPromotions] = useState([]);
  const [produitsPopulaire, setProduitsPopulaire] = useState([]);
  const [categories, setCategories] = useState([]);

  // fetch cart from api or localStorage
  useEffect(() => {
    if (!user || user.role !== "client") return;
    fetchUserCart();
    setCart(
      localStorage.getItem("guestCartItems")
        ? JSON.parse(localStorage.getItem("guestCartItems"))
        : []
    );
  }, [user]);

  const [cart, setCart] = useState(
    localStorage.getItem("guestCartItems")
      ? JSON.parse(localStorage.getItem("guestCartItems"))
      : []
  );

  // to display carousel
  const imagesCode = [1001, 1002, 1003];
  const imagesList = imagesCode.map((item) => {
    return `./images/${item}.png`;
  });

  // Fetch user cart from database
  const fetchUserCart = async () => {
    try {
      const userIdResponse = await axios.get(
        `/utilisateur/find/${user.courriel}`
      );

      const response = await axios.get(`/panier/${userIdResponse.data._id}`);
      localStorage.setItem(
        "guestCartItems",
        JSON.stringify(response.data.articles)
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

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

  // API call to fetch categories
  useEffect(() => {
    axios
      .get("/categories")
      .then(function (response) {
        // handle success
        setCategories(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [axios]);

  // API call to fetch popular products
  useEffect(() => {
    axios
      .get("/produits/populaire")
      .then(function (response) {
        // handle success
        setProduitsPopulaire(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [axios]);

  // API call to fetch promotion products
  useEffect(() => {
    axios
      .get("/produits/promotion")
      .then(function (response) {
        // handle success
        setPromotions(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [axios]);

  return (
    <ModelePage>
      <Stack gap={3}>
        <Carrousel images={imagesList} />

        <Container className="text-center">
          <Row className="p-3">
            <h1>Les Promotions</h1>
          </Row>
          <Row xs={1} md={3} className="g-3 justify-content-center">
            {promotions.map((produit) => (
              <Col xs="auto" md="auto" key={produit._id}>
                <CarteProduit
                  produit={produit}
                  handleAddToCart={handleAddToCart}
                />
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="text-center">
          <Row className="p-3">
            <h1>Les Produits Populaires</h1>
          </Row>
          <Row xs={1} md={3} className="g-3 justify-content-center">
            {produitsPopulaire
              .map((produitPopulaire) => (
                <Col xs="auto" md="auto" key={produitPopulaire._id}>
                  <CarteProduit
                    produit={produitPopulaire}
                    handleAddToCart={handleAddToCart}
                  />
                </Col>
              ))
              .slice(0, 3)}
          </Row>
        </Container>

        <Container className="text-center">
          <Row className="p-3">
            <h1>Les Catégories</h1>
          </Row>
          <Row xs={1} md={3} className="g-3 justify-content-center">
            {categories
              .map((categorie) => (
                <Col xs="auto" md="auto" key={categorie._id}>
                  {/* {JSON.stringify(categorie)} */}
                  <CarteCategorie categorie={categorie} />
                </Col>
              ))
              .slice(0, 10)}
          </Row>
        </Container>
      </Stack>
    </ModelePage>
  );
}

export default PageAccueil;
