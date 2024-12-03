const path = require("path");

const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/", shopController.getAllProducts);

router.get("/products", shopController.getAllProducts);

router.post("/products", shopController.createProduct); // Tạo sản phẩm// Lấy danh sách sản phẩm
router.get("/products/:id", shopController.getProductById); // Lấy sản phẩm theo ID
router.delete("/products/:id", shopController.deleteProductById); // Xóa sản phẩm theo ID

// router.get("/cart", shopController.getCart);

// router.post("/postCart", shopController.postCart);

// router.post("/delete", shopController.postCartDeleteProduct);

// router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
