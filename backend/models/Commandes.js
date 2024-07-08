import mongoose from "mongoose";

const commandesSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },

  client: {
    type: Boolean,
    default: false,
    require: true
  },

  infosclient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clients",
  },

  orderDate: {
    type: String,
    required: true,
    default: "12-12-2023"
  },

  deliveryDate: {
    type: String,
    required: true,
    default: "12-01-2024"
  },

  shippingInfos: {
    nomClient: { type: String, required: true },
    prenomClient: { type: String, required: true },
    courriel: { type: String, required: true },
    tel: { type: String, required: true },
    adresse: {
      numeroCivic: { type: String, required: true },
      rue: { type: String, required: true },
      ville: { type: String, required: true },
      province: { type: String, required: true },
      cp: { type: String, required: true },
    },
  },

  articles: [
    {
      codeProduit: {
        type: Number,
        required: true,
      },

      prix: {
        type: Number,
        required: true,
      },

      quantite: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  status: {
    type: String,
    enum: [
      "Not paid",
      "Paid",
      "Processed",
      "Shipped",
      "Deliverer",
      "Completed",
    ],
    default: "Not paid",
  },

  sousTotal: {
    type: Number,
    required: true,
    default: 0,
  },

  fraisLivraison: {
    type: Number,
    required: true,
    default: 0,
  },

  tps: {
    type: Number,
    required: true,
    default: 0,
  },

  tvq: {
    type: Number,
    required: true,
    default: 0,
  },

  rabais: {
    type: Number,
    required: true,
    default: 0,
  },

  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Commandes", commandesSchema, "Commandes");
