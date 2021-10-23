const express = require('express');
const { seedNews } = require('../../utils/helper')
const { getNews, getNewsById, } = require('../../models/dataService')
const newsRouter = express.Router();

seedNews()

newsRouter.get('/:newsId', (req, res) => {
    res.send(getNewsById(req.params.newsId))
})

newsRouter.get('/', (req, res) => {
    res.send(getNews())
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