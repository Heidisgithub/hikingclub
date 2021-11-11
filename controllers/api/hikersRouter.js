const express = require('express');
const { seedHikers } = require('../../utils/helper')
const { deleteHiker, getHikersIndex, makePublicHiker, createHiker, addHiker, getHikers, getHikersById } = require('../../models/dataService')
const hikersRouter = express.Router();

seedHikers()

hikersRouter.get('/', (req, res) => {
    res.send(getHikers())
})

hikersRouter.get('/:id', (req, res) => {
    const searchHiker = getHikersById(req.params.id)
    if (searchHiker) {
        res.send(makePublicHiker(searchHiker))
    } else {
        res.status(404).send()
    }
})

hikersRouter.post('/', (req, res) => {
    const newHiker = createHiker(req.body)
    try {
        addHiker(newHiker)
        res.status(201).send(getHikers())
    } catch (err) {
        res.status(406).send(err)
    }
})

hikersRouter.put('/:id', (req, res) => {
    const searchHiker = getHikersById(req.params.id)
    if (searchHiker) {
        const hikerUpdates = req.body
        searchHiker._firstName = hikerUpdates.firstName
        searchHiker._lastName = hikerUpdates.lastName
        searchHiker._email = hikerUpdates.email
        res.send(makePublicHiker(searchHiker))
    } else {
        res.status(404).send()
    }
})

hikersRouter.delete('/:id', (req, res) => {
    const searchHikerIndex = getHikersIndex(req.params.id)
    if (searchHikerIndex !== -1) {
        res.status(204).send(deleteHiker(searchHikerIndex))
    } else {
        res.status(404).send()
    }
})

module.exports = hikersRouter