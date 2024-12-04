const path = require("path");

const express = require("express");

const shopController = require("../controllers/shopController");
const shopController1 = require("../controllers/shopController1");

const router = express.Router();

router.get("/", shopController.getAllProducts);

router.get("/products", shopController.getAllProducts);

router.post("/products", shopController.createProduct); // Tạo sản phẩm// Lấy danh sách sản phẩm
router.get("/products/:id", shopController.getProductById); // Lấy sản phẩm theo ID
router.delete("/products/:id", shopController.deleteProductById); // Xóa sản phẩm theo ID

router.get("/cart", shopController1.getCart);

router.post("/postCart", shopController1.postCart);

router.post("/delete", shopController1.postCartDeleteProduct);

router.get("/orders", shopController1.getOrders);

router.get("/checkout", shopController1.getCheckout);

module.exports = router;
