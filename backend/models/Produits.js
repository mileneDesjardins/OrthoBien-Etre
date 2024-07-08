import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  codeProduit: {
    type: Number,
    required: true,
    unique: true,
  },

  nomProduit: {
    type: String,
    required: true,
    unique: true,
    maxlength: 250,
  },

  pDescription: {
    type: String,
    required: true,
    maxlength: 250,
  },

  description: {
    type: String,
    unique: true,
  },

  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  codeCategorie: {
    type: Number,
    required: true,
  },

  prix: {
    type: Number,
  },

  quantite: {
    type: Number,
  },

  promotion: {
    type: Boolean,
    required: true,
  },

  populaire: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Produits", produitSchema, "Produits");
