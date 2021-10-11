const express = require('express');
const { seedHikes } = require('../../utils/helper')
const { deleteHike, getHikesIndex, addHike, createHike, getHikesById, getHikes } = require('../../models/dataService')
const hikesRouter = express.Router();

//seedHikes()

hikesRouter.get('/', async (req, res) => {
    res.send(await getHikes())
})

hikesRouter.get('/:uuid', async (req, res) => {
    const searchHike = await getHikesById(req.params.uuid)
    if (searchHike) {
        res.send(searchHike)
    } else {
        res.status(404).send()
    }
})

// TODO - Modify put into patch operation
hikesRouter.put('/:uuid', (req, res) => {
    const searchHike = getHikesById(req.params.uuid)
    if (searchHike) {
        const hikeUpdates = req.body
        searchHike._title = hikeUpdates.title
        searchHike._location = hikeUpdates.location
        res.send(searchHike)
    } else {
        res.status(404).send()
    }
})

hikesRouter.post('/', async (req, res) => {
    const newHike = createHike(req.body)
    try {
        res.status(201).send(
            await addHike(newHike)            
        )
    } catch (err) {
        res.status(406).send(err)
    }
})

hikesRouter.delete('/:uuid', async (req, res) => {
    try {
      res.status(204).send(await deleteHike(req.params.uuid))
    } catch(err) {
        res.status(406).send(err)
    }
})

module.exports = hikesRouter