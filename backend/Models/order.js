const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false, // Tắt tự động thêm createdAt và updatedAt
  }
);

module.exports = Order;
