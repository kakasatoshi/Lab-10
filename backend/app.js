const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
