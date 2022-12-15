const blueBirdPromise = require('bluebird');
const jwt = blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const { settings } = require('../constant/common');
const { PRIVATE_KEY } = require('../config/index');

const generateToken = (data) => {
    const options = { expiresIn: settings.expiresIn };

    return jwt.signAsync(data, PRIVATE_KEY, options)
        .then((jwtToken) => {
            return jwtToken;
        }).catch(error => {
            return res.send({ "status": "Failed", "message": error });
        });
};

module.exports = generateToken;