const mongoose = require("mongoose");

const URL_SERVER = "mongodb://vegetagoto:THPKAIiP9Atpbkbh@cluster0-shard-00-00.tcxyq.mongodb.net:27017,cluster0-shard-00-01.tcxyq.mongodb.net:27017,cluster0-shard-00-02.tcxyq.mongodb.net:27017/TracNghiem?ssl=true&replicaSet=atlas-12c1wg-shard-0&authSource=admin&retryWrites=true&w=majority";

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
