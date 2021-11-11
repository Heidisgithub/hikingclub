const jwt = require('jsonwebtoken')
const jwtKey = process.env.jwtKey

const checkSession = (req, res, next) => {
    if (req.query.session) {
        const user = getUserFromToken(req.query.session)
        if (!user) {
            res.status(400).send({ error: "Unknown user" })
            return
        }
        req.user = user
        next()
    } else {
        res.status(400).send({ error: "User not authenticated" })
    }
}

const generateSession = (email) => {

    const token = jwt.sign({ email }, jwtKey, { expiresIn: '1h' })
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

module.exports = {
    generateSession,
    checkSession
}