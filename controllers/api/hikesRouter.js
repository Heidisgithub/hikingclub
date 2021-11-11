const express = require('express');
const { seedHikes } = require('../../utils/helper')
const { deleteHike, getHikesIndex, addHike, createHike, getHikesById, getHikes, updateHike, getRegistrations, addRegistration, createRegistration, getAllRegistrations } = require('../../models/dataService');
const { checkSession } = require('../../models/sessions');
const hikesRouter = express.Router();

hikesRouter.use('/private', checkSession)
    //seedHikes()

hikesRouter.get('/', async(req, res) => {
    res.send(await getHikes())
})

hikesRouter.get('/private/registrations', async(req, res) => {
    res.send(await getAllRegistrations())
})

hikesRouter.get('/:uuid', async(req, res) => {
    const hikeData = await getHikesById(req.params.uuid)
    if (hikeData) {
        hikeData.registrations = await getRegistrations(req.params.uuid)
        console.log(hikeData)
        res.send(hikeData)
    } else {
        res.status(404).send()
    }
})

// TODO - Modify put into patch operation
hikesRouter.patch('/private/:uuid', async(req, res) => {
    try {
        res.status(200).send(
            await updateHike(req.params.uuid, req.body)
        )
    } catch (err) {
        console.log(err)
        res.status(406).send(err)
    }
})

hikesRouter.put('/private/:uuid', (req, res) => {
    const hikeData = getHikesById(req.params.uuid)
    if (hikeData) {
        const hikeUpdates = req.body
        hikeData._title = hikeUpdates.title
        hikeData._location = hikeUpdates.location
        res.send(hikeData)
    } else {
        res.status(404).send()
    }
})

hikesRouter.post('/private/', async(req, res) => {
    const newHike = createHike(req.body)
    try {
        res.status(201).send(
            await addHike(newHike)
        )
    } catch (err) {
        res.status(406).send(err)
    }
})


hikesRouter.post('/private/:uuid/registration', async(req, res) => {
    const newRegistration = createRegistration(req.body)
    newRegistration.hike_uuid = req.params.uuid
        // try {
    res.status(201).send(await addRegistration(newRegistration))
        // } catch (err) {
        //     res.status(406).send(err)
        // }
})


hikesRouter.delete('/private/:uuid', async(req, res) => {
    try {
        res.status(204).send(await deleteHike(req.params.uuid))
    } catch (err) {
        res.status(406).send(err)
    }
})

// hikesRouter.delete('/registrations/:id', async(req,res) => {
//     try {
//         res.status(204).send(await deleteRegistration(req.params.id))
//     } catch (err) {
//         res.status(406).send(err)
//     }
// })

module.exports = hikesRouter