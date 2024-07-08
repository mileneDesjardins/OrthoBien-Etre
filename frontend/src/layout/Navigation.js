import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { UserContext } from "..";
import Logo from "../components/Logo";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchBar } from "../components/searchbar";
import "./Navigation.module.css";

function Navigation() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  // gestion deconnexion
  const onDeconnexionClick = () => {
    localStorage.removeItem("guestCartItems");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container
        fluid
        style={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Logo img="/images/bones.svg" path="/" />
        <Navbar.Brand>
          <Nav.Link onClick={() => navigate("/")}>OrthoBien-Être</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/catalogue")}>
              Catalogue
            </Nav.Link>
          </Nav>

          <Row
            style={{ alignItems: "center", justifyContent: "end", gap: "15px" }}
          >
            {user && (
              <Col style={{ padding: 0, flexGrow: 0 }}>
                <span>Bienvenue {user?.prenom || "Admin"}</span>
              </Col>
            )}
            {user && user?.role === "admin" && (
              <Col style={{ padding: 0, flexGrow: 0 }}>
                <Logo img="/images/inventaire.svg" path="/admin" />
              </Col>
            )}
            <Col style={{ padding: 0, flexGrow: 0 }}>
              <Logo
                img="/images/user.svg"
                path={user ? "/compte" : "/connexion"}
                height="45"
                width="45"
              />
            </Col>
            {(!user || user?.role !== "admin") && (
              <Col style={{ padding: 0, flexGrow: 0 }}>
                <Logo img="/images/panier.svg" path="/panier" />
              </Col>
            )}
            {user && (
              <Col style={{ padding: 0, flexGrow: 0 }}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={onDeconnexionClick}
                >
                  Déconnexion
                </Button>
              </Col>
            )}
            <Col style={{ padding: 0, flexGrow: 0 }}>
              <SearchBar />
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
