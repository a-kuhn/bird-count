const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register(req, res) {
    const user = new User(req.body);

    user
      .save()
      .then((newUser) => {
        //login newUser
        res.cookie("usertoken", jwt.sign({_id: newUser._id}, process.env.JWT_SECRET), {httpOnly: true})
          .json({msg: `logged in newUser: ${newUser.email}`})
      })
      .catch((err) => res.status(400).json(err));
  },

  login(req, res) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ msg: "invalid login attempt" });
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              if (passwordIsValid) {
                res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),{httpOnly: true})
                  .json({ msg: "success!" });
              } 
              else {res.status(400).json({ msg: "invalid login attempt" });}
            })
            .catch((err) => res.status(400).json({ msg: "invalid login attempt" }));
        }
      })
      .catch((err) => res.json(err));
  },

  logout(req, res) {
    console.log(`********logging out********`);
    res.clearCookie("usertoken");
    res.json({ msg: "usertoken cookie cleared" });
  },

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  getAllChecklists(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    User.findById(decodedJWT.payload._id).populate("checklists")
      .then(checklists => {console.log(`getAllChecklists: SUCCESS`); res.json(checklists)})
      .catch(err => res.json(err));
  },

  update(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    User.findByIdAndUpdate(decodedJWT.payload._id, req.body, {runValidators: true, new: true})
      .then(res => {console.log(`updated user's checklist: SUCCESS`);})
      .catch(err => res.status(400).json(err));
  },
};