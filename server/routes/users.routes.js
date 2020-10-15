const UsersController = require('../controllers/users.controller');
// can pass authenticate as 2nd param to any route that user needs to be logged in to access
const {authenticate} = require('../config/jwt.config'); 

module.exports = app => {
    //get all users
    app.get("/api/users", UsersController.getAllUsers);
    //get single users
    app.get("/api/users/:id", UsersController.getSingleUser);
    //create new user
    app.post("/api/users/new", UsersController.register);
    //update existing user
    app.post("/api/users/update/:id", UsersController.updateUser);
    //delete single user
    app.delete("/api/users/delete/:id", UsersController.deleteUser);
}