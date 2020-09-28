const express = require("express");
const app = express();
const port = 8000;

// to run server on specific port:
app.listen( port, () => console.log(`listening on port: ${port}`));

// Express middleware functions responsible for providing and parsing req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

