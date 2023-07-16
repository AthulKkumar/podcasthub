require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

//Sockets

const socketMapping = {};

io.on("connection", (socket) => {
  console.log("New connection ", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketMapping[socket.id] = user;

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });
    socket.emit(ACTIONS.ADD_PEER, {});
    socket.join(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
