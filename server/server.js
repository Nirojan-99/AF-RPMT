const express = require("express");
const app = express();
const db = require("./db");

//start server
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(5000);
  }
});
