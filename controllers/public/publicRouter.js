const express = require('express');
const publicRouter = express.Router();
const { getHikes, getHikesById } = require('../../models/dataService')

publicRouter
    .get('/', async(req, res) => {
        //Todo fetch hikes data with data sevice and pass it to template
        const hikes = await getHikes()
        res.render('pages/hikes', { hikes })

    })
    .get('/login', (req, res) => res.render('pages/notimplemented'))
    .get('/news', (req, res) => res.render('pages/notimplemented'))
    .get('/news/:id', (req, res) => res.render('pages/notimplemented'))
    .get('/hikers', (req, res) => res.render('pages/notimplemented'))
    .get('/hikers/:id', (req, res) => res.render('pages/notimplemented'))
    .get('/hikes', (req, res) => res.render('pages/notimplemented'))
    .get('/hikes/:id', async(req, res) => {
        const hike = await getHikesById(req.params.id);
        console.log(hike)
        res.render('pages/hikePage', { hike })
    })

.post('/userapi/hikers', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .delete('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikes/:id', (req, res) => res.status(400).send("not implemented yet"))



module.exports = publicRouter