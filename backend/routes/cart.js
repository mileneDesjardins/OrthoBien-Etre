import express from 'express';
import Cart from '../models/Panier.js';

const router = express.Router();

/***
 * Cette route va chercher les informations du panier du client
 * en utilisant son id passe en parametres
 */
router.get("/:clientid", async (req, res) => {
  const clientid = req.params.clientid;
  
  try {
    const cart = await Cart.findOne({ 'client.infosClient': clientid });
    if (cart && cart.articles.length > 0) {
      res.json(cart);
    } else {
      res.json({ articles: [] }); // Send an empty array if cart is null or empty
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send();
  }
});

  /***
 * Cette route efface les articles du panier
 * ainsi que le total de produits et le prix total
 */
  router.put('/clear/:cartid', async (req, res) => {
    const cartId = req.params.cartid;
    
    try{
      const clearCart = await Cart.findOne({'client.infosClient': cartId});

      console.log("clearCart with userid: " + clearCart)

      if (clearCart  && cart.articles.length > 0) {
        clearCart.articles = [];
        clearCart.nombreArticles = 0;
        clearCart.montantAvantTaxes = 0.00;

        console.log(clearCart);
    
        await clearCart.save();
          res
            .status(200)
            .json({ message: "Le panier a été vidé avec succès!" });
        } else {
          res.status(404).json({ message: "Ce panier n'existe pas" });
        }
    } catch(error){
      console.log(error);
      res.status(500).json({error});
    }
  });

 /***
 * Cette route modifie les informations du panier du client
 * en utilisant son id passé en paramètre
 */
  router.put('/update/:userid', async (req, res) => {
    const userId = req.params.userid;
    const newCart = req.body.guestCartItems;
    let cartSize = 0;
    let cartTotal = 0;

    if (newCart && Array.isArray(newCart)) {
      cartSize = newCart.reduce((size, item) => size + item.qtt, 0);
      cartTotal = newCart.reduce((total, item) => total + item.prix * item.qtt, 0);
    }

    try {
      const updateCart = await Cart.findOneAndUpdate(
        { 'client.infosClient': userId },
        {
          $set: {
            articles: newCart,
            nombreArticles: cartSize,
            montantAvantTaxes: cartTotal
          },
        },
        { new: true }
      );
  
      if (updateCart) {
        res.json(updateCart);
      } else {
        res.status(404).json({ message: "Ce panier n'existe pas" });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error });
    }
  });

  /***
 * Cette route cherche et retourne le panier d'achat
 * en utilisant son id passé en paramètre
 */
router.get('/:cartid', async (req, res) => {
  try{
      const cartId = req.params.cartid;
      const cart = await Cart.findOne({cartid: cartId}, 'totalProducts');
      res.json(cart);
  } catch (err){
      res.status(500).json({message: err.message})
  }
});

/***
 * Cette route cherche et retourne tous les paniers 
 */
router.get('/', async (req, res) => {
  try{
      const cart = await Cart.find()
      res.json(cart)
  } catch (err){
      res.status(500).json({message: err.message})
  }
  
});

export default router;