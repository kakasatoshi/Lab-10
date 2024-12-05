const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
  },
  {
    timestamps: false, // Tắt tự động thêm createdAt và updatedAt
  }
);

module.exports = OrderItem;
