// const Product = require("./path/to/Product");

// // Tạo sản phẩm mới và lưu vào tệp JSON
// const newProduct = new Product(
//   "Book",
//   "http://image.url",
//   "A great book",
//   10.99
// );
// newProduct.save();

// // Lấy tất cả sản phẩm và in ra
// Product.fetchAll((products) => {
//   console.log(products);
// });

const Product = require("../Models/Product");

exports.getAddProduct = (req, res, next) => {
  res.json({
    message: "Add product page",
    pageTitle: "Add Product",
    path: "/admin/AddProduct",
    editing: false,
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { title, imageUrl, description, price } = req.body;
    const product = await Product.create({
      title,
      imageUrl,
      description,
      price,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};
// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;

//   const product = new Product(null, title, imageUrl, description, price);
//   product
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Product added successfully!" });
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Failed to add product", error });
//     });
// };
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     if (!product) {
//       return res.redirect("/");
//     }
//     res.json({
//       message: "Edit product page",
//       path: "/admin/EditProduct",
//       editing: editMode,
//       product: product,
//     });
//   });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice
//   );
//   updatedProduct.save();
//   res.redirect("/admin/products");
// };
exports.updateProductById = async (req, res) => {
  const productId = req.params.productId;
  // console.log("Product ID:", productId);
  // console.log("Request body:", req.body);

  try {
    const [updatedRows] = await Product.update(req.body, {
      where: { id: productId }, // Sử dụng productId thay vì req.params.id
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    // console.error("Error updating product:", error); // Log chi tiết lỗi
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.json({
      message: "Products page",
      path: "/admin/products",
      prods: products,
    });
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const product = await Product.findById(prodId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy(); // Xóa sản phẩm khỏi cơ sở dữ liệu

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
