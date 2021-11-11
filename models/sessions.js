const jwt = require('jsonwebtoken')
const jwtKey = process.env.jwtKey

const checkSession = (req, res, next) => {
    if (req.query.session) {
        const payload = getPayloadFromToken(req.query.session)
        if (!payload) {
            res.status(400).send({ error: "Unknown user" })
            return
        }
        req.email = payload.email
        req.userRole = payload.userRole
        next()
    } else {
        res.status(400).send({ error: "User not authenticated" })
    }
}

const isOperationAllowed = (req, roleToCheckAgainst) => {
    console.log(req)
    console.log(roleToCheckAgainst)
    return req.userRole === roleToCheckAgainst
}

const generateSession = (email, userRole) => {

    const token = jwt.sign({ email, userRole }, jwtKey, { expiresIn: '1h' })
    return token
}


const getUserFromToken = (token) => {
    try {
        let data = jwt.verify(token, jwtKey)
        console.log(data)

        return data.email || false
    } catch (err) {
        console.log(err.message)
        return false
    }
}

const getPayloadFromToken = (token) => {
    try {
        let data = jwt.verify(token, jwtKey)
        console.log(data)

        return data || false
    } catch (err) {
        console.log(err.message)
        return false
    }
}

module.exports = {
    generateSession,
    checkSession,
    isOperationAllowed
}