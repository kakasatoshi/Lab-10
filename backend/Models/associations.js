const User = require("./user");
const CartItem = require("./cart-item");
const Product = require("./Product");
const Order = require("./order");
const OrderItem = require("./order-item");

// Thiết lập mối quan hệ
User.hasMany(CartItem);
CartItem.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  User,
  CartItem,
  Product,
  Order,
  OrderItem,
};
