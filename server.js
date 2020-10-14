require("dotenv").config();

const express = require("express"),
  cookieParser = require("cookie-parser"),
  cors = require("cors");

require("./server/config/mongoose.config")(process.env.DB_NAME);

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/routes/users.routes")(app);

app.listen(process.env.DB_PORT, () =>
  console.log(`Listening on port ${process.env.DB_PORT}`)
);