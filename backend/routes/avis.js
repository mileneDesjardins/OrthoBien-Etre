import express from "express";
import Avis from "../models/Avis.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

/**
 * Cette route permet d'ajouter un avis
 * dans la collection Avis
 */
router.post("/", async (req, res) => {
  try {
    const { note, codeProduit, commentaire, token } = req.body;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "client") {
      res.status(401).json({
        message: "TODO ADMIN PEUT PAS CREER COMMENTAIRE",
      });
      return;
    }

    const newAvis = new Avis({
      codeProduit,
      prenomClient: user.prenom,
      note,
      commentaire,
    });

    await newAvis.save();

    res.status(200).json({ message: "L'avis a été ajouté !" });
  } catch (error) {
    console.log(error);
    res.status(550).json({ erreur: "Could not add avis" });
  }
});

export default router;
