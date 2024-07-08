import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Logo({ path, img, width = "40", height = "40" }) {
  return (
    <Link to={path}>
      <img
        src={img}
        width={width}
        height={height}
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Link>
  );
}

export default Logo;
