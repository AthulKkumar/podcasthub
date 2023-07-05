require("dotenv").config();
const express = require("express");
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const corsOption = {
  origin: ["http://localhost:3000"],
};

DbConnect();
app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
