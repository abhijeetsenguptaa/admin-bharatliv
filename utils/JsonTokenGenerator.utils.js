require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');


function JsonTokenGenerator(userID) {
    const token = jsonwebtoken.sign({ "userID": userID }, process.env.SECRET_KEY);
    return token;
}

module.exports = JsonTokenGenerator;