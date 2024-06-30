const express = require("express");
const { v4: uuidv4 } = require("uuid");
const myUuid = uuidv4();
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${myUuid}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

app.listen(3000, () => {
  console.log(`App listening on port 3000!`);
});
