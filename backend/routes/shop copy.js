const path = require("path");

const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/", shopController.getProducts);


router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/postCart", shopController.postCart);

router.post("/delete", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
