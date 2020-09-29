
const mongoose = require("mongoose");

// export an arrow function so that our server.js can
// pass in the db_name
module.exports = (db_name) => {
  mongoose
    .connect(`mongodb://localhost/${db_name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Successfully connect to ${db_name}`);
    })
    .catch((err) => {
      console.log(`mongoose connection to ${db_name} failed`, err);
    });
};