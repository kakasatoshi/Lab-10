const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database.js");
// const Product = require("./Models/Product");
const {
  User,
  CartItem,
  Product,
  Order,
  OrderItem,
} = require("./Models/associations.js");

sequelize
  // .sync()
  .sync({ force: true })
  .then((result) => {
    return User.findById(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());

app.use(cors());

const apiRoutes = require("./routes/shop.js");
const adminRoutes = require("./routes/admin.js");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
