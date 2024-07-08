import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  courriel: {
    type: String,
    unique: true,
    required: true,
  },

  numeroCivic: {
    type: String,
    required: true,
  },

  rue: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },

  telephone: {
    type: String,
  },

  prenom: {
    type: String,
    required: true,
  },

  nom: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Clients", clientsSchema, "Clients");
