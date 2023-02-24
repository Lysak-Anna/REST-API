const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection
  .then(() => {
    app.listen(PORT, (error) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return process.exit(1);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    return process.exit(1);
  });
