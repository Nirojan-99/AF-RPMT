const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const app = express();
const db = require("./db");

//routers
const DocumentRoute = require("./Router/DocumentRoute");
const ChatRoute = require("./Router/ChatRoute");

//middlewares
app.use(BodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(BodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// statically serve files
app.use("/Uploads", express.static("Uploads"));

//routes
app.use("/api/v1/documents", DocumentRoute);
app.use("/api/v1/chats", ChatRoute);

//start server
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(5000);
  }
});
