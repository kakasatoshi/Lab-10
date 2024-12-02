const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database.js");
const Product = require("./Models/Product");

sequelize
  .sync() // Sử dụng .sync({ force: true }) để xóa và tạo lại bảng
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing the database:", err));

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
