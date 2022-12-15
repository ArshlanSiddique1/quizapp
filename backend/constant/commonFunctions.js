const bcrypt = require('bcryptjs');

const comparePassword = async ({ password, dbPassword }) => {
    try {
        const isMatch = await bcrypt.compare(password, dbPassword)
        return isMatch;
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    comparePassword,
}