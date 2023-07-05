const mongoose = require("mongoose");

function DbConnect() {
  const DB_URI = process.env.DB_URI;

  mongoose.connect(DB_URI);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error :"));
  db.once("open", () => {
    console.log("DataBase Connected succesfully");
  });
}

module.exports = DbConnect;
