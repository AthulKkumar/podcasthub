require("dotenv").config();
const express = require("express");
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

DbConnect();
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));
app.use(express.json({ limit: "8mb" }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
