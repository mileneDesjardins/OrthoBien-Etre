import { Col, ListGroup, Row, Stack } from "react-bootstrap";

const HistoriqueCommande = (props) => {
  const orderHistory = props.orderHistory;

  return (
    <ListGroup variant="flush">
      {orderHistory &&
        orderHistory.map((item) => (
          <ListGroup.Item mb={2}>
            <Stack
              direction="vertical"
              gap={1}
              style={{ justifyContent: "center", margin: "0px" }}
            >
              <Row>
                <Col>
                  <h5>
                    Order to: {item.shippingInfos.prenomClient}{" "}
                    {item.shippingInfos.nomClient}
                  </h5>
                </Col>
              </Row>
              <Row>
                <p>Order Id: {item.orderId}</p>
              </Row>
              <Row>
                <Col>Status: {item.status}</Col>
                <Col>Total: ${item.total} </Col>
              </Row>
            </Stack>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default HistoriqueCommande;

