import express from "express";
import Produits from "../models/Produits.js";
import jwt from "jsonwebtoken";
import Images from "../models/Images.js";

const router = express.Router();
router.use(express.json());

/**
 * Cette route permet de modifier un produit
 * dans la collection Produits ,elle verifie
 * avant que le produit existe  en se basant
 * sur le codeProduit.
 */

router.put("/", async (req, res) => {
  try {
    const {
      codeProduit,
      nomProduit,
      pDescription,
      quantite,
      description,
      codeCategorie,
      prix,
      promotion,
      populaire,
      token,
    } = req.body;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "admin") {
      res.status(401).json({
        message:
          "Vous n'avez pas les autorisations nécessaires pour ajouter un produit.",
      });
      return;
    }

    const verifProduit = await Produits.findOne({ codeProduit });

    if (verifProduit) {
      verifProduit.nomProduit =
        nomProduit != undefined ? nomProduit : verifProduit.nomProduit;
      verifProduit.pDescription =
        pDescription != undefined ? pDescription : verifProduit.pDescription;
      verifProduit.quantite =
        quantite != undefined ? quantite : verifProduit.quantite;
      verifProduit.description =
        description != undefined ? description : verifProduit.description;
      verifProduit.codeCategorie =
        codeCategorie != undefined ? codeCategorie : verifProduit.codeCategorie;
      verifProduit.prix = prix != undefined ? prix : verifProduit.prix;
      verifProduit.promotion =
        promotion != undefined ? promotion : verifProduit.promotion;
      verifProduit.populaire =
        populaire != undefined ? populaire : verifProduit.populaire;

      await verifProduit.save();

      for (const { mimetype, buffer } of req.files) {
        const newImage = new Images({
          codeProduit,
          image: buffer.toString("base64"),
          mimeType: mimetype,
        });

        await newImage.save();
      }

      res
        .status(200)
        .json({ message: "Le produit a été modifié avec succès !" });
    } else {
      res.status(404).json({ message: "Ce produit n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: "Impossible de modifier ce produit" });
  }
});

export default router;
