const mongoose = require("mongoose");

const URL_SERVER = "mongodb+srv://vegetagoto:THPKAIiP9Atpbkbh@cluster0.tcxyq.mongodb.net/TracNghiem?retryWrites=true&w=majority";

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
