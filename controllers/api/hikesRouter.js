const express = require('express');
const { seedHikes } = require('../../utils/helper')
const { deleteHike, getHikesIndex, addHike, createHike, makePublicHike, getHikesById, getHikes } = require('../../models/dataService')
const hikesRouter = express.Router();

seedHikes()

hikesRouter.get('/', (req, res) => {
    res.send(getHikes())
})

hikesRouter.get('/:id', (req, res) => {
    const searchHike = getHikesById(req.params.id)
    if (searchHike) {
        res.send(makePublicHike(searchHike))
    } else {
        res.status(404).send()
    }
})

hikesRouter.put('/:id', (req, res) => {
    const searchHike = getHikesById(req.params.id)
    if (searchHike) {
        const hikeUpdates = req.body
        searchHike._title = hikeUpdates.title
        searchHike._location = hikeUpdates.location
        res.send(makePublicHike(searchHike))
    } else {
        res.status(404).send()
    }
})

hikesRouter.post('/', (req, res) => {
    const newHike = createHike(req.body)
    try {
        addHike(newHike)
        res.status(201).send(getHikes())
    } catch (err) {
        res.status(406).send(err)
    }
})

hikesRouter.delete('/:id', (req, res) => {
    const searchHikeIndex = getHikesIndex(req.params.id)
    if (searchHikeIndex !== -1) {
      res.status(204).send(deleteHike(searchHikeIndex))
    } else {
      res.status(404).send()
    }
})

module.exports = hikesRouter