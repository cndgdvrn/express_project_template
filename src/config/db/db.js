const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kfm1i90.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Db bağlantısı başarılı");
  })
  .catch((err) => {
    console.log(`Db ye bağlanırken hata !!!!!!!!!! : ${err}`);
  });
