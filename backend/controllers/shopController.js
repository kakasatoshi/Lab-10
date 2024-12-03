const Product = require("../Models/Product");

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

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ product });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };
exports.getProductById = async (req, res) => {
  const productId = req.params.id; // Lấy ID từ URL
  try {
    const product = await Product.findAll({
      where: { id: productId },
    });

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product: product[0] }); // Trả về sản phẩm đầu tiên
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const result = await Product.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
