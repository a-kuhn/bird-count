const Checklist = require('../models/checklist.model');
const User = require('../models/user.model');

const jwt = require("jsonwebtoken");

module.exports = {
    // create a new checklist
    create(req, res) {
        console.log(`creating a new checklist!\n${req.body}`);
        const checklist = new Checklist(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
        console.log(`userID: ${decodedJWT.payload._id}`);

        checklist.save()
            .then(newList => {
                console.log(`adding newChecklist to db:\n${newList}`);
                res.json({ msg: "success!", newList: newList });
            })
            .catch(err => res.json(err));
    },
    // get user's checklist to load into SingleChecklist view
    getOne(req, res){
        console.log(`retrieving checklist:\nreq.body: ${req.params}`);
        
        Checklist.findById(req.params.id)
            .then((checklist) => res.json(checklist))
            .catch((err) => res.json(err));
    },
    // save updates
    update(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
    
        Checklist.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
          .then(res => {
            console.log(`updated checklist: ${res.data}`);
          })
          .catch(err => res.status(400).json(err));
    },
    // delete a checklist
    delete(req, res){
        console.log(`deleteing checklist: ${req.params.id}`);

        Checklist.findByIdAndDelete(req.params.id)
            .then(checklist => res.json(checklist))
            .catch(err => res.json(err));
    },
};