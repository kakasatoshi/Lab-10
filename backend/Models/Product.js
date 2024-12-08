const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }
);

/** Thêm Phương Thức */

Product.createProduct = async (productData) => {
  return await Product.create(productData);
};

Product.findById = async (id) => {
  return await Product.findOne({ where: { id } });
};

Product.updateById = async (id, updateData) => {
  const [affectedRows] = await Product.update(updateData, { where: { id } });
  if (affectedRows === 0) {
    throw new Error("Product not found");
  }
  return await Product.findOne({ where: { id } }); // Trả lại bản ghi đã cập nhật
};

Product.deleteById = async (id) => {
  const product = await Product.findById(id);
  if (product) {
    return await product.destroy();
  }
  throw new Error("Product not found");
};

module.exports = Product;
