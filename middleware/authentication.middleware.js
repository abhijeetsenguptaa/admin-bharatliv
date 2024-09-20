require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model');

async function authentication(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 401,
                message: "Please provide a valid Bearer token."
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
            if (decode) {
                console.log(decode);
                req.userID = decode.userID;
                const user = await UsersModel.findOne({ where: { id: req.userID } });
                role = user.role;
                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        message: "User not found"
                    });
                }

                req.user = user;
                next();

            } else {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid Token"
                });
            }


        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

module.exports = { authentication };
