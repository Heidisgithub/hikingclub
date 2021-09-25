const express = require('express');
const { seedHikers } = require('../../utils/helper')
const { getHikers } = require('../../models/dataService')
const hikersRouter = express.Router();

seedHikers()

hikersRouter.get('/', (req, res) => {
    res.send(getHikers())
})

hikersRouter.get('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

hikersRouter.post('/', (req, res) => {
    res.status(400).send('Not implemented yet')
})

hikersRouter.put('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

hikersRouter.delete('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

module.exports = hikersRouter