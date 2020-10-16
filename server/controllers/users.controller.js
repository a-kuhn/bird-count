const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// export an object that is full of methods
module.exports = {
    register(req, res) {
        User.create(req.body)
            .then(newUser => {
                const userToken = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
                res.cookie("usertoken", userToken, secret, {httpOnly:true})
                    .json({message:"register & login: success!", newUser: newUser});
            })
            .catch(err => {console.log(err); res.json(err)});
    },

    // login(req, res) {
    //     User.findOne({ email: req.body.email })
    //     .then((user) => {
    //         if (user === null) {
    //         res.status(400).json({ msg: "invalid login attempt" });
    //         } else {
    //         bcrypt
    //             .compare(req.body.password, user.password)
    //             .then((passwordIsValid) => {
    //             if (passwordIsValid) {
    //                 res
    //                 .cookie(
    //                     "usertoken",
    //                     jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
    //                     {
    //                     httpOnly: true,
    //                     }
    //                 )
    //                 .json({ msg: "success!" });
    //             } else {
    //                 res.status(400).json({ msg: "invalid login attempt" });
    //             }
    //             })
    //             .catch((err) =>
    //             res.status(400).json({ msg: "invalid login attempt" })
    //             );
    //         }
    //     })
    //     .catch((err) => res.json(err));
    // },

    // logout(req, res) {
    //     res.clearCookie('usertoken');
    //     res.sendStatus(200);
    // },

    // getLoggedInUser(req, res) {
    //     const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

    //     User.findById(decodedJWT.payload._id)
    //     .then((user) => res.json(user))
    //     .catch((err) => res.json(err));
    // },
};