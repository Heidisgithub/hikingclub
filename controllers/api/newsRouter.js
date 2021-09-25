const express = require('express');
const { seedNews } = require('../../utils/helper')
const { getNews } = require('../../models/dataService')
newsRouter = express.Router();

seedNews()

newsRouter.get('/', (req, res) => {
    res.send(getNews())
})

newsRouter.get('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

newsRouter.post('/', (req, res) => {
    res.status(400).send('Not implemented yet')
})

newsRouter.put('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

newsRouter.delete('/:id', (req, res) => {
    res.status(400).send('Not implemented yet')
})

module.exports = newsRouter