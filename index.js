const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.set("useFindAndModify", false);
mongoose.connect(
  "mongodb+srv://vegetagoto:THPKAIiP9Atpbkbh@cluster0.tcxyq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error! :" + err);
    } else {
      console.log("Connected!");
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello from server!");
});

app.listen(5000, () => {
  console.log("App listening port 5000!");
});

app.get("/api/helloworld", (req, res) => {
  res.json({ sayHi: "Hello from server, nice to meet you!" });
});
