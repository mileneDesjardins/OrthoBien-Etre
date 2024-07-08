import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Etoile = ({ evaluation, onChange, size }) => {
  const [rating, setRating] = useState(evaluation);
  const [hover, setHover] = useState(null);

  // ajouter notes au produit en cliquant sur les etoiles
  const handleOnClick = (currentRating) => {
    setRating(currentRating);
    onChange(currentRating);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              style={{ display: "none" }}
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() =>
                !evaluation ? handleOnClick(currentRating) : null
              }
            />
            <FaStar
              style={{ cursor: "pointer" }}
              size={size}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() =>
                !evaluation ? setHover(currentRating) : null
              }
              onMouseLeave={() => (!evaluation ? setHover(null) : null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Etoile;
