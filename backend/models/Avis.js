import mongoose from "mongoose";

const avisSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produits",
  },
  codeProduit: {
    type: Number,
    required: true,
  },

  prenomClient: {
    type: String,
    required: true,
  },

  note: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  commentaire: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Avis", avisSchema, "Avis");
