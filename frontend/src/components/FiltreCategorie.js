import { useContext, useEffect, useState } from "react";
import { DropdownButton, Form } from "react-bootstrap";
import { AxiosContext } from "..";

function FiltreCategorie({ filtre, setFiltre }) {
  const axios = useContext(AxiosContext);
  const [categories, setCategories] = useState([]);

  // filtre par categorie
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
      })
      .finally(function () {
        // always executed
      });
  }, [axios]);

  const onCategorieChange = (e) => {
    setFiltre(parseInt(e.target.value));
  };

  const getNomFiltre = () => {
    if (!filtre) {
      return "";
    }

    const nomCategorie = categories.find(
      (categorie) => categorie.codeCategorie === filtre
    )?.nomCategorie;

    return `: ${nomCategorie}`;
  };

  return (
    <DropdownButton
      variant="secondary"
      id="dropdown-basic-button"
      title={`Filtrer par catégorie${getNomFiltre()}`}
      style={{ margin: "0px 0px 15px 0px" }}
      autoClose="outside"
    >
      {categories.map((categorie) => (
        <a href="#/" className="dropdown-item" key={categorie.codeCategorie}>
          <Form.Check>
            <Form.Check.Input
              type="radio"
              id={`categorie-${categorie.codeCategorie}`}
              name="formulaire-categorie-trier"
              value={categorie.codeCategorie}
              checked={filtre === categorie.codeCategorie}
              onChange={onCategorieChange}
            />
            <Form.Check.Label
              htmlFor={`categorie-${categorie.codeCategorie}`}
              style={{ width: "100%" }}
            >
              {categorie.nomCategorie}
            </Form.Check.Label>
          </Form.Check>
        </a>
      ))}
    </DropdownButton>
  );
}

export default FiltreCategorie;
