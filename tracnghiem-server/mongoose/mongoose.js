const mongoose = require("mongoose");

const URL_SERVER = "mongodb://vatlytracnghiem:qJiX36qKXhKIz8Sh@cluster0-shard-00-00.1pcio.mongodb.net:27017,cluster0-shard-00-01.1pcio.mongodb.net:27017,cluster0-shard-00-02.1pcio.mongodb.net:27017/TracNghiem?ssl=true&replicaSet=atlas-hrkqfx-shard-0&authSource=admin&retryWrites=true&w=majority";

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
