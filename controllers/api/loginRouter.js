const express = require('express');
const loginRouter = express.Router();


loginRouter.get('/', (req, res) => {
    res.status(404).send('something is wrong')
})

module.exports = loginRouter