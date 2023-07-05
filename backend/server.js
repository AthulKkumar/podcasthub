require("dotenv").config();
const express = require("express");
const router = require("./routes");
const DbConnect = require("./database");

const app = express();

const PORT = process.env.PORT || 5000;
DbConnect();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
