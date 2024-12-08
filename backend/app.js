const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database.js");
const {
  User,
  CartItem,
  Product,
  Order,
  OrderItem,
} = require("./Models/associations.js");

const app = express();

sequelize
  .sync({ force: true }) // Ensures tables are re-created; remove `force` for production
  .then(() => {
    return User.findByPk(1); // Updated method
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use(cors());

const apiRoutes = require("./routes/shop.js");
const adminRoutes = require("./routes/admin.js");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
