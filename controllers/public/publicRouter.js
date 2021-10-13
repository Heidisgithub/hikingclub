const express = require('express');
const publicRouter = express.Router();
const { getHikes } = require("../../models/dataService");

publicRouter
    .get('/', (req, res) => res.render('pages/notimplemented'))
    .get('/login', (req, res) => res.render('pages/notimplemented'))
    .get('/news', (req, res) => res.render('pages/notimplemented'))
    .get('/news/:id', (req, res) => res.render('pages/notimplemented'))
    .get('/hikers', (req, res) => res.render('pages/notimplemented'))
    .get('/hikers/:id', (req, res) => res.render('pages/notimplemented'))
    .get('/hikes', (req, res) => res.render('pages/notimplemented'))
    .get('/hikes/:id', (req, res) => res.render('pages/hikePage'))

.post('/userapi/hikers', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .delete('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
    .put('/userapi/hikes/:id', (req, res) => res.status(400).send("not implemented yet"))



module.exports = publicRouter