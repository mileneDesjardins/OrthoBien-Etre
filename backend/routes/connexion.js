import express from "express";
import jwt from "jsonwebtoken";
import Administrateurs from "../models/Administrateurs.js";
import Clients from "../models/Clients.js";

const router = express.Router();
router.use(express.json());

/**
 * Cette route verifier que l'adresse courriel et le mot de passe
 * concordent avec l'information dans l'une des deux collections :
 * Clients ou Administrateurs
 * Elle retoure un message d'accueuil avec le prenom de la personne
 * connectée.
 * @returns Et les values nécessaire au profil client ou profil admin
 */

router.post("/", async (req, res) => {
  try {
    //Information de connexion
    const { courriel, mdp } = req.body;

    //veification de l'acces admin
    const admin = await Administrateurs.findOne(
      { courriel },
      "courriel mdp prenomAdmin codeAdmin "
    );

    if (!admin) {
      //Verification de l'acces client
      const user = await Clients.findOne(
        { courriel },
        "courriel mdp prenom nom numeroCivic rue ville province codePostal telephone"
      );

      if (!user) {
        return res
          .status(501)
          .json({ erreur: "Votre courriel ou mot de passe est incorrect" });
      }

      //return : message d'accueil + valeurs pour page profil
      if (user.mdp == mdp) {
        const auth = {
          role: "client",
          message: "Bonjour " + user.prenom,
          prenom: user.prenom,
          courriel: user.courriel,
          nom: user.nom,
          numeroCivic: user.numeroCivic,
          rue: user.rue,
          ville: user.ville,
          province: user.province,
          codePostal: user.codePostal,
          telephone: user.telephone,
        };

        const token = jwt.sign(auth, process.env.JWT_SECRET);

        return res.status(200).json({
          success: true,
          token,
          ...auth,
        });

        

      } else {
        return res
          .status(401)
          .json({ erreur: "Votre courriel ou mot de passe est incorrect" });
      }
    } else {
      if (admin.mdp == mdp) {
        //return message d'accueil + value pour page profil admin au besoin

        const auth = {
          role: "admin",
          message:
            "Bonjour " +
            admin.prenomAdmin +
            " vous êtes connecté comme administrateur",
          prenomAdmin: admin.prenomAdmin,
          codeAdmin: admin.codeAdmin,
        };

        const token = jwt.sign(auth, process.env.JWT_SECRET);

        return res.status(200).json({
          success: true,
          token,
          ...auth,
        });
      } else {
        return res
          .status(401)
          .json({ erreur: "Courriel admin ou mot de passe est incorrect" });
      }
    }
  } catch (error) {
    res.status(510).json({ erreur: "Utilisateur n'est pas existant" });
  }
});

export default router;
