const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();

var CauHoiModel = require("./models/CauHoi");

const URL_CLIENT = "http://localhost:3000";
const URL_SERVER = "mongodb+srv://vegetagoto:THPKAIiP9Atpbkbh@cluster0.tcxyq.mongodb.net/TracNghiem?retryWrites=true&w=majority";

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", URL_CLIENT);
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set("useFindAndModify", false);
mongoose.connect(
  URL_SERVER,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error! :" + err);
    } else {
      console.log("Connected!");
    }
  }
);

app.get("/", (req, res) => {
  res.send("hello from server!");
});

app.listen(5000, () => {
  console.log("App listening port 5000!");
});

app.get("/api/helloworld", (req, res) => {
  res.json({ sayHi: "Hello from server, nice to meet you!" });
});

app.get("/api/cau-hoi", async (req, res) => {

  const cauHoi = await CauHoiModel.find({});
  try {
    res.send(cauHoi);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/cau-hoi", (req, res) => {
  let newCauHoi = new CauHoiModel({
    noiDung: req.body.txt_noidung,
    dapAn: req.body.dapan,
    doKho: req.body.select_doKho,
    dangToan: req.body.select_dangToan,
  });

  console.log(newCauHoi);

  CauHoiModel.find({});

  newCauHoi.save(function(err) {
    if (err) {
      console.log("Save error! " + err);
    } else {
      console.log("Save successful!");
      res.json({msg: 'success'});
    }
  });
});
