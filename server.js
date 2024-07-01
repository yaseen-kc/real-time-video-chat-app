const express = require("express");
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);

const app = express();
const myUuid = uuidv4();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${myUuid}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", () => {
    console.log("Joined the room");
  });
});

app.listen(3000, () => {
  console.log(`App listening on port 3000!`);
});
