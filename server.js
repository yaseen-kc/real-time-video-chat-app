const express = require("express");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const myUuid = uuidv4();
const io = socketIo(server);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${myUuid}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected");
  });
});

server.listen(3000, () => {
  console.log(`App listening on port 3000!`);
});
