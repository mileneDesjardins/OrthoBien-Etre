import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PiedDePage.css";

function PiedDePage() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <Nav className="justify-content-center">
              <Nav.Link
                onClick={() => navigate("/catalogue")}
                className="highlight-on-hover"
              >
                Catalogue
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/faq")}
                className="highlight-on-hover"
              >
                F.A.Q.
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/contacts")}
                className="highlight-on-hover"
              >
                Contacts
              </Nav.Link>
            </Nav>
          </div>
          <div className="col-auto">
            <p className="text-right">
              &copy; {new Date().getFullYear()} OrthoBien-Être
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PiedDePage;
