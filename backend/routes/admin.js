// const express = require("express");
// const router = express.Router();
// const Cart = require("../models/Cart");

// // Route thêm sản phẩm vào giỏ hàng
// router.post("/add-to-cart", (req, res) => {
//   const productId = req.body.productId;
//   const productPrice = parseFloat(req.body.productPrice);
//   Cart.addProduct(productId, productPrice);
//   res.redirect("/cart"); // Chuyển hướng đến trang giỏ hàng sau khi thêm
// });

// module.exports = router;

const path = require("path");

const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

// /admin/add-product => GET
router.get("/product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
