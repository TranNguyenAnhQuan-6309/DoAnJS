const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretOrKey = require("../configs/keys").secretOrKey;
const User = require("../models/user");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) return res.status(400).json({ success: false, message: errors });
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json({ success: false, message: errors.email });
        } else {
            User.findOne({ cardId: req.body.cardId }).then(user => {
                if (user) {
                    errors.cardId = "Personal ID already exists";
                    return res.status(400).json({ success: false, message: errors.cardId });
                } else {
                    const newUser = new User({
                        cardId: req.body.cardId,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        password: req.body.password,
                        city: req.body.city,
                        street: req.body.street
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json({ success: true, user }))
                                .catch(err => res.status(404).json({ success: false, message: "Could not register user" }));
                        });
                    });
                }
            });
        }
    });
});



router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User not found";
            return res.status(400).json({ success: false, message: errors.email });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                const payload = {
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname
                };

                jwt.sign(payload, secretOrKey, (err, token) => {
                    if (err) throw err;
                    res.json({ success: true, message: "Token was assigned", token: token, user: user });
                });
            } else {
                errors.password = "Password is incorrect";
                return res.status(400).json({ success: false, message: errors.password });
            }
        });
    });
});
module.exports = router;