import Carousel from "react-bootstrap/Carousel";

function Carrousel({
  images,
  itemHeight = "600px",
  style = {},
  className = "",
}) {
    const imagesCode = [1001,1002,1003];

  return (
    <Carousel style={style} variant="dark" className={className}>
      {imagesCode.map((image, index) => (
        <Carousel.Item style={{ height: itemHeight }} key={index}>
          <img
            className="d-block w-100 h-100 object-fit-cover"
            src={`./images/${image}.png`}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrousel;
