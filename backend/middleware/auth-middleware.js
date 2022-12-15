const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require('..//config/index');

const checkAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Getting token from header
            token = authorization.split(' ')[1]

            // JWT Verify
            const { userID } = jwt.verify(token, PRIVATE_KEY)

            // Get User from Token
            req.user = await Users.findById(userID).select('-password')
            next()
        } catch (error) {
            res.send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.send({ "status": "failed", "message": "Unauthorized User, No Token!" })
    }
}


// isAdmin Middleware
// const isAdmin = async (req, res, next) => {
//     let token
//     const { authorization } = req.headers
//     if (!token) {
//         res.send({ "status": "failed", "message": "Unauthorized User, No Token!" })
//     }
//     if (authorization && authorization.startsWith('Bearer')) {
//         // Getting token from header
//         token = authorization.split(' ')[1]

//         // JWT Verify
//         const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         req.user = await Users.findById(userID)
//         if (req.user.role === 0) {
//             res.send({ "status": "failed", "message": "Unauthorized User, You must be an Admin!" })
//         }
//     }
//     next()
// }

module.exports = checkAuth;
// module.exports = isAdmin;