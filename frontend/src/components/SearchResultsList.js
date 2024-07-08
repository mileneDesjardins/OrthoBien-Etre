import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../components/SearchResultsList.css";
import { convertToDataUrl } from "../utils";

export const SearchResultsList = ({ results }) => {
  const navigate = useNavigate();
  const firstFourResults = results.slice(0, 4);

  return (
    <div style={{ position: "absolute" }}>
      <div className="results-list">
        {firstFourResults.map((result, id) => {
          return (
            <div
              onClick={() => navigate(`/produit/${result.codeProduit}`)}
              key={id}
              className="result-item"
            >
              <img
                src={convertToDataUrl(result.images[0])}
                alt={`Image for ${result.nomProduit}`}
              />
              <span>{result.nomProduit}</span>
            </div>
          );
        })}

        <Button
          onClick={() =>
            navigate(`/recherche`, {
              state: { total: results },
            })
          }
          variant="outline-success"
          size="sm"
          style={{
            height: "10%",
            alignSelf: "center",
            margin: "0 5px 0 0",
          }}
        >
          Voir plus
        </Button>
      </div>
    </div>
  );
};
