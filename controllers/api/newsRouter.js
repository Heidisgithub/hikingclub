const express = require('express');
const { seedNews } = require('../../utils/helper')
const { getNews, getNewsById } = require('../../models/dataService')
const newsRouter = express.Router();

// seedNews()

newsRouter.get('/', async (req, res) => {
    res.send(await getNews())
})

newsRouter.get('/:id', async (req, res) => {
    const searchNews = await getNewsById(req.params.id)
    if (searchNews) {
        res.send(searchNews)
    } else {
        res.status(404).send()
    }
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