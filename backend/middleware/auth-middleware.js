const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require('..//config/index');


const userAuth = (req, res, next) => {
    const deviceType = req.headers['devicetype'] ? req.headers['devicetype'] : 'web';
    const deviceToken = req.headers['devicetoken'] ? req.headers['devicetoken'] : '';
    const token = req.headers['Authorization'] || req.headers['authorization'];
    const locale = req.headers['locale'] ? req.headers['locale'] : 'en';
    console.log("token", token)

    if (!token) {
        return sendCustomError("", res, 401, "No token provided.");
    } else {
        jwt.verify(token, PRIVATE_KEY, async function (error, decoded) {
            if (error) {
                console.log("error", error)

                sendCustomError(error, res, 401, "Invalid token.");
            } else if (decoded.userId == 0 || undefined || '') {
                console.log("decoded.userId", decoded.userId)

                sendCustomError(error, res, 401, "User doesn't exist.");
            } else {
                const result = await Users.findOne({ accessToken: token });
                console.log("result", result)
                if (result) {

                    req.data = {
                        userId: decoded.userId,
                        email: decoded.email,
                        token: token,
                        deviceType: deviceType,
                        deviceToken: deviceToken
                    }
                    return next();

                } else {
                    sendCustomError(error, res, 401, "User session expired.");
                }
            }
        })
    }
};


module.exports = userAuth
