const express = require('express');
const publicRouter = express.Router();
const { getHikes, getHikesById, getNews, getNewsById, addUser, verifyUser } = require('../../models/dataService')
const { generateSession } = require('../../models/sessions')


publicRouter
    .get('/', async(req, res) => {
        res.render('pages/hikes', { hikes: await getHikes() })

    })
    .post('/login', async(req, res) => {
        let userRole = await verifyUser(req.body.email, req.body.password);
        console.log(userRole)
        if (userRole) {
            const sessionId = generateSession(req.body.email, userRole)
            return res.status(200).send(sessionId)

        } else {
            res.status(400).send({ error: "Wrong username or password" })
        }
    })
    .get('/news', async(req, res) => res.render('pages/newspage', { news: await getNews() }))
    .get('/news/:id', async(req, res) => res.render('pages/news', { news: await getNewsById(req.params.id) }))
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

.post('/user', async(req, res) => {
    const email = req.body.email
    const userName = req.body.userName
    const password = req.body.password
    const result = await addUser(email, password, userName)
    if (!result) {
        res.status(406).send()
        return
    }
    res.status(201).send("User added")
})


module.exports = publicRouter