const jwt = require('jsonwebtoken')

const generateToken=(id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, {
        expiresIN: '30d',
    })
}

module.exports = generateToken