const User = require('../models/user');
const ecrypt = require('../middlewares/ecrypt');


function addUser(user) {
    user.password = ecrypt.hash(user.password);
    return user.save();
}

function checkEmail(email) {
    return User.find({ email }).exec();
}

function checkId(id) {
    return User.find({ id }).exec();
}


function login(details) {
    details.password = ecrypt.hash(details.password);
    return User.find({ email: details.email, password: details.password });
}


module.exports = {
    addUser,
    checkEmail,
    checkId,
    login
}