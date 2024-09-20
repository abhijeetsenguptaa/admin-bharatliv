require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');


function JsonTokenGenerator(userID, role) {
    const token = jsonwebtoken.sign({ "userID": userID, "role": role }, process.env.SECRET_KEY);
    return token;
}

module.exports = JsonTokenGenerator;