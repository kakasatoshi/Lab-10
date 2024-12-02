// // const Product = require("../Models/Product");

// // exports.getProduct = (req, res) => {
// //   Product.fetchAll((products) => {
// //     res.json(products); // send the products array as JSON
// //   });
// // };

// // exports.postProduct = (req, res) => {
// //   console.log(req.body, "post");
// //   const product = new Product(
// //     req.body.title,
// //     req.body.imageUrl,
// //     req.body.description,
// //     req.body.price
// //   );
// //   // const { title, imageUrl, description, price } = req.body;
// //   // const product = new Product(title, imageUrl, description, price);
// //   product.save((err) => {
// //     if (err) return res.status(400).send(err);
// //     // res.send(product);
// //     // res.send("Product created successfully");

// //     res.status(201).json({ message: "Product added successfully!" });
// //   });
// // };

// const Product = require("../models/product");
// const Cart = require("../models/cart");

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.json({
//       message: "Product",
//       prods: products,
//     });
//   });
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     res.json({
//       message: "Get Product By ID %",
//       product: product,
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.json(products);
//   });
// };

// exports.getCart = (req, res, next) => {
//   Cart.getCart((cart) => {
//     Product.fetchAll((products) => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           (prod) => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.json({
//         message: "Get products and quantity data from cart",
//         products: cartProducts,
//       });
//     });
//   });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.id;
//   console.log(prodId, "POST Cart Product");
//   Product.findById(prodId, (product) => {
//     Cart.addProduct(prodId, product.price);
//     // console.log(prodId, product.price, "prodId, product.price");
//   });
//   // const product = Product.findById(prodId);

//   // console.log(product,"Post Product");
//   // if (!product) {
//   //   return res.status(404).json({ message: "Product not found!" });
//   // }else {
//   //   Cart.addProduct(prodId, product.price);
//   //   res.status(200).json({ message: "Product added to cart!" });
//   // }

//   res.status(200).json({ message: "Product added to cart!" });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

/////////////////////////////
const Product = require("../models/product");
const Cart = require("../models/cart");

// Lấy danh sách sản phẩm
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.json({
        message: "Product list retrieved successfully",
        prods: products,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve products" });
    });
};

// Lấy chi tiết sản phẩm theo ID
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      if (product.length > 0) {
        res.json({
          message: `Product retrieved successfully`,
          product: product[0],
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve product" });
    });
};

// Lấy danh sách sản phẩm trên trang chính
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve products" });
    });
};

// Lấy sản phẩm từ giỏ hàng
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll()
      .then(([products]) => {
        const cartProducts = [];
        for (let product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        }
        res.json({
          message: "Cart products and quantities retrieved successfully",
          products: cartProducts,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve cart products" });
      });
  });
};

// Thêm sản phẩm vào giỏ hàng
exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then(([product]) => {
      if (product.length > 0) {
        Cart.addProduct(prodId, product[0].price);
        res
          .status(200)
          .json({ message: "Product added to cart successfully!" });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to add product to cart" });
    });
};

// Xóa sản phẩm khỏi giỏ hàng
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      if (product.length > 0) {
        Cart.deleteProduct(prodId, product[0].price);
        res
          .status(200)
          .json({ message: "Product removed from cart successfully!" });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to remove product from cart" });
    });
};

// Lấy danh sách đơn hàng (chưa có chức năng hoàn chỉnh)
exports.getOrders = (req, res, next) => {
  res.json({
    message: "This feature is under development",
  });
};

// Lấy trang thanh toán (chưa có chức năng hoàn chỉnh)
exports.getCheckout = (req, res, next) => {
  res.json({
    message: "Checkout page is under development",
  });
};
