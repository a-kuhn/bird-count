  
const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
  // REGISTER
  app.post("/api/register", userController.register);
  // LOGIN
  app.post("/api/login", userController.login);
  // LOGOUT
  app.post("/api/logout", userController.logout);

  // these routes have to be authenticated with JWT
  // GET LOGGED IN USER
  app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);
};