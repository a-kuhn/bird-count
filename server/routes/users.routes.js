const UsersController = require('../controllers/users.controller');

module.exports = app => {
    //get all users
    app.get("/api/users", UsersController.getAllUsers);
    //get single users
    app.get("/api/users/:id", UsersController.getSingleUser);
    //create new user
    app.post("/api/users/new", UsersController.createUser);
    //update existing user
    app.post("/api/users/update/:id", UsersController.updateUser);
    //delete single user
    app.delete("/api/users/delete/:id", UsersController.deleteUser);
}