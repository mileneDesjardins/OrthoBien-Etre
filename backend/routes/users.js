import express from "express";
import Clients from "../models/Clients.js";

const router = express.Router();
router.use(express.json());

/***
 * Cette route ajoute un utilisateur dans la base de donnees
 */
router.post("/inscription", async (req, res) => {
  try {
    const {
      prenom,
      nom,
      courriel,
      mdp,
      numeroCivic,
      rue,
      ville,
      province,
      codePostal,
      telephone,
    } = req.body;

    // TODO: Regarder si le courriel n'existe pas avant d'inserer

    const newClient = new Clients({
      prenom,
      nom,
      courriel,
      mdp,
      numeroCivic,
      rue,
      ville,
      province,
      telephone,
      codePostal,
    });

    console.log(newClient);

    await newClient.save();
    res.status(200).json({ message: "Enregistré" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/***
 * Cette route cherche et retourne un utilisateur par son adresse courriel
 */
router.get("/find/:useremail", async (req, res) => {
  const userEmail = req.params.useremail;
  try {
    const theUser = await Clients.findOne({ courriel: userEmail });

    if (!theUser) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }
    res.json(theUser);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
