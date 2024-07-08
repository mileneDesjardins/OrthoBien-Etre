import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Commandes from "../models/Commandes.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

/***
 * Cette route ajoute une commande avec toutes informations
 * Elle contient toutes les informations de livraison
 * du client invité ou du client connecté
 */
router.post("/", cors(), async (req, res) => {
  try {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const todayDate = `${day}-${month}-${year}`;
    const deliveryDate = `${day+5}-${month}-${year}`; 

    let orderDetails = req.body;

    const newOrder = new Commandes({
      orderId: orderDetails.orderId,
      paymentId: orderDetails.paymentId,
      client: orderDetails.isClient,
      orderDate: todayDate,
      deliveryDate: deliveryDate,
      shippingInfos: {
        nomClient: orderDetails.shipping.nom,
        prenomClient: orderDetails.shipping.prenom,
        courriel: orderDetails.shipping.courriel,
        tel: orderDetails.shipping.telephone,
        adresse: {
          numeroCivic: orderDetails.shipping.civique,
          rue: orderDetails.shipping.rue,
          ville: orderDetails.shipping.ville,
          province: orderDetails.shipping.province,
          cp: orderDetails.shipping.postal,
        },
      },

      articles: orderDetails.cart,

      status: "Paid",
      sousTotal: orderDetails.sousTotal,
      fraisLivraison: orderDetails.fraisLivraison,
      tps: orderDetails.tps,
      tvq: orderDetails.tvq,
      rabais: 0,
      total: orderDetails.total,
    });

    await newOrder.save();
    res.status(200).json({ message: "Enregistré" });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed: " + error,
      success: false,
    });
  }
});

/***
 * Cette route cherche et retourne toutes les commande d'un client
 * par son adresse courriel
 */
router.get("/:emailAddress", async (req, res) => {
  const courriel = req.params.emailAddress
  try {
    const orderList = await Commandes.find({ 'shippingInfos.courriel':  courriel});
    res.json(orderList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
