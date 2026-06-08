const express = require("express");
const cors = require("cors");
require("dotenv").config();

const foodRoutes =
  require("./routes/foodRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant API Running");
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});