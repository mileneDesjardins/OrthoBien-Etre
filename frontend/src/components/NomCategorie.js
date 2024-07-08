import { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { AxiosContext } from "..";

function NomCategorie({ codeCategorie }) {
  const axios = useContext(AxiosContext);
  const [categorie, setCategorie] = useState(null);

  useEffect(() => {
    axios
      .get(`/categories/${codeCategorie}`)
      .then(function (response) {
        // handle success
        setCategorie(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <ListGroup.Item>
      {categorie ? categorie.nomCategorie : "Catégorie Inconnue"}
    </ListGroup.Item>
  );
}

export default NomCategorie;
