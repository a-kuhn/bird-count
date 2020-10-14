require('dotenv').config();
const express = require("express"),
  // cookieParser = require("cookie-parser"),
  cors = require("cors");


// const mongooseConfigFunc = require("./config/mongoose.config");
// mongooseConfigFunc(db_name);
// shorthand of above
require("./server/config/mongoose.config.js")(process.env.DB_NAME);

const app = express();

// app.use(cookieParser());
// Prevent CORS error when making request from react port 3000 to server port 8000
// Error in chrome console: Access to XMLHttpRequest at...
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// req.body undefined without this!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/routes/users.routes.js")(app);

app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port ${process.env.DB_PORT} for REQuests to RESpond to.`),
);