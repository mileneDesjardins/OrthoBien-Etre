import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { AxiosContext } from "..";
import { SearchResultsList } from "./SearchResultsList";

export const SearchBar = () => {
  const axios = useContext(AxiosContext);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios.get("/produits").then((response) => {
      const results = response.data.filter((Produits) => {
        return (
          value &&
          Produits &&
          Produits.nomProduit &&
          Produits.nomProduit.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
    });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Recherche"
        className="me-2"
        aria-label="Search"
        style={{
          width: "330px",
        }}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {results && results.length > 0 && <SearchResultsList results={results} />}
    </Form>
  );
};
