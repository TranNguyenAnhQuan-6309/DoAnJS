const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userAct = require('../action/user-action');
const jwt = require("jsonwebtoken");
const jwtAct = require('../middlewares/jwt');

router.post('/register', async(request, response) => {
    try {
        const user = new User(request.body);

        const checkEmail = await userAct.checkEmail(user.email);
        const checkId = await userAct.checkId(user.id);
        if (checkEmail.length !== 0) { throw "Email already exists" }
        if (checkId.length !== 0) { throw "ID already exists" }

        const newUser = await userAct.addUser(user);
        newUser.password = null;

        const jwtToken = jwt.sign({ user: newUser }, 'secretkey');
        response.json({ user: newUser, jwtToken });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/login', async(request, response) => {
    try {
        const details = request.body;
        const getUser = await userAct.login(details);
        if (getUser.length === 0) {
            response.json('Wrong email / password');
            return;
        }
        const user = getUser[0];
        const jwtToken = jwt.sign({ user }, 'secretkey');
        response.json({ user, jwtToken });
    } catch (error) {
        response.status(500).send(error.message);
    }
});
router.post('/check-form', async(request, response) => {
    try {
        const form = request.body;

        form.email = await userAct.checkEmail(form.email);
        form.id = await userAct.checkId(form.id);
        response.json(form);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/auto-login', jwtAct.verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json(err);
        } else {
            res.json(authData);
        }
    });
});

module.exports = router;