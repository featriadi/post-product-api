require('dotenv').config()
const jwt = require('jsonwebtoken')

async function verifyToken(req, res, next) {
    const tokenHeader = req.headers.authorization

    if(tokenHeader === undefined) {
        return res.status(400).send({
            status: "error",
            message: "must provide token"
        })
    }

    const token = tokenHeader.split(' ')

    if (token[0] !== 'Bearer') {
        return res.status(401).send({
            status: "error",
            message: "incorrect token format"
        })
    }

    jwt.verify(token[1], process.env.JWT_SECRET_ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).json({
                message: err.message
            })
        }

        req.user = decoded
        return next()
    })
}

function getUserId(header) {
    const token = header.split(' ')
    let userId

    jwt.verify(token[1], process.env.JWT_SECRET_ACCESS_TOKEN, function(err, decoded) {
        userId = decoded.data.id
    })

    return userId
}

module.exports = {
    verifyToken,
    getUserId
}