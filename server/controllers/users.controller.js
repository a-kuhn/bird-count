const User = require('../models/user.model');

module.exports = {
    // /api/users  --> getAllUsers
    getAllUsers(req, res) {
        User.find()
            .then(allUsers => res.json({allUsers: allUsers}))
            .catch(err => res.json({message: "Something went wrong with getAllUsers()"}));
    },
    // /api/users/:id  --> getSingleUser
    getSingleUser(req, res) {
        User.findOne({_id: req.params.id})
            .then( singleUser => res.json({ user: singleUser}))
            .catch(err => res.json({message: "Something went wrong with getSingleUser()", error: err}));
    },
    // /api/users/new  --> createUser
    createUser(req, res) {
        User.create(req.body)
            .then(newUser => res.json({newUser: newUser}))
            .catch(err => res.json({message: "Something went wrong with createUser()", error: err}))
    },
    // /api/users/edit/:id  --> updateUser
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            .then(updatedUser => res.json({updatedUser: updatedUser}))
            .catch(err => res.json({message: "Something went wrong with updateUsesr", error: err}))
    },
    // /api/users/delete/:id  --> deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
            .then(result => res.json({result: result}))
            .catch(err => res.json({message: "Something went wrong with deleteUser", error: err}))
    }
};