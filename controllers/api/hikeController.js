const express = require('express');
const { seedHikes } = require('../../utils/helper')
const { getHikes } = require('../../models/dataService')
hikeRouter = express.Router();

seedHikes()

hikesRouter.get('/', (req, res) => {
    res.send(getHikes())
})

hikesRouter.put('/', (req, res) => {
    res.status(404).send('something is wrong')
})

hikesRouter.post('/', (req, res) => {
    res.status(404).send('something is wrong')
})

hikesRouter.delete('/', (req, res) => {
    res.status(404).send('something is wrong')
})

module.exports = hikesRouter