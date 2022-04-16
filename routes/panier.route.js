const express = require("express");
const router = express.Router();

const PanierController = require("../controllers/panier.controller");

router.get("/ShowallCarts", PanierController.ShowallCarts);
router.post("/GetCartsbyUserid/", PanierController.GetCartsbyUserid);
router.post("/AddToCart", PanierController.AddToCart);
router.post("/DeleteItemFromCart", PanierController.DeleteItemFromCart);
router.post("/totalPrice", PanierController.totalPrice);
router.post("/getArtDetails/", PanierController.getArtDetails);
//
router.post("/incrementQuantity", PanierController.incrementQuantity);
router.post("/decrementQuantity", PanierController.decrementQuantity);
//
module.exports = router;
