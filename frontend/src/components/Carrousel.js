import Carousel from "react-bootstrap/Carousel";
import { convertToDataUrl } from "../utils";

function Carrousel({
  images,
  itemHeight = "600px",
  style = {},
  className = "",
}) {
  return (
    <Carousel style={style} variant="dark" className={className}>
      {images.map((image, index) => (
        <Carousel.Item style={{ height: itemHeight }} key={index}>
          <img
            className="d-block w-100 h-100 object-fit-cover"
            src={convertToDataUrl(image)}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrousel;
