import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosContext } from "..";

const Checkout = (props) => {
  const orderDetails = props.orderDetails;

  const handleApproved = (orderId, paymentId) => {
    orderDetails.orderId = orderId;
    orderDetails.paymentId = paymentId;

    axios
      .post("/commande", orderDetails)
      .then(function (response) {
        if (response.status === 200) {
          navigate("/confirmation", {
            state: {
              total: orderDetails.total,
              orderId: orderId,
              paymentId: paymentId,
            },
          });
        } else {
          console.log("error message from PageLivraison");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la capture de la commande PayPal :",
          error
        );
      });
  };

  const navigate = useNavigate();
  const axios = useContext(AxiosContext);
  const [{ isPending }] = usePayPalScriptReducer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "CAD",
            value: orderDetails.total,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      handleApproved(data.orderID, data.paymentID);
    });
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
