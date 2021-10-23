const express = require('express');
const publicRouter = express.Router();
const { getHikes, getHikesById, getNews, getNewsById } = require('../../models/dataService')


publicRouter
    .get('/', async(req, res) => {
        res.render('pages/hikes', { hikes: await getHikes() })

    })
    .get('/login', (req, res) => res.render('pages/notimplemented'))
    .get('/news', async(req, res) => res.render('pages/newspage', {news:await getNews()}))
    .get('/news/:id', async(req, res) => res.render('pages/news', {news:await getNewsById(req.params.id)}))
    .get('/hikers', (req, res) => res.render('pages/notimplemented'))
    .get('/hikers/:id', (req, res) => res.render('pages/notimplemented'))
    .get('/hikes', async(req, res) => {
        res.render('pages/hikeslist', { hikes: await getHikes(), url: req.url })
    })
    .get('/hikes/:id', async(req, res) => {
        res.render('pages/hikePage', { hike: await getHikesById(req.params.id) })
    })

.post('/userapi/hikers', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .delete('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikes/:id', (req, res) => res.status(400).send("not implemented yet"))



module.exports = publicRouter