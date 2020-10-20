const Checklist = require('../models/checklist.model');
const User = require('../models/user.model');

const jwt = require("jsonwebtoken");

module.exports = {
    // create a new checklist && add newChecklist._id to user.checklists
    create(req, res) {
        const checklist = new Checklist(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

        checklist.save()
            .then(newList => {
                User.findByIdAndUpdate(decodedJWT.payload._id, 
                    { $push: {checklists: newList._id}},
                    {new: true, useFindAndModify: false});
            })
            .catch(err => res.json(err));
    }
};


// const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
// User.findById(decodedJWT.payload._id)
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
