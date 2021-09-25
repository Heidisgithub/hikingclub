const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const newsRouter = require('./controllers/api/newsRouter');
const hikersRouter = require('./controllers/api/hikersRouter');

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api/news', newsRouter)
  .use('/api/hikers', hikersRouter)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/notimplemented'))
  .get('/login', (req, res) => res.render('pages/notimplemented'))
  .get('/news', (req, res) => res.render('pages/notimplemented'))
  .get('/news/:id', (req, res) => res.render('pages/notimplemented'))
  .get('/hikers', (req, res) => res.render('pages/notimplemented'))
  .get('/hikers/:id', (req, res) => res.render('pages/notimplemented'))
  .get('/hikes', (req, res) => res.render('pages/notimplemented'))
  .get('/hikes/:id', (req, res) => res.render('pages/notimplemented'))

  .post('/userapi/hikers', (req, res) => res.status(400).send("not implemented yet"))
  .put('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
  .delete('/userapi/hikers/:id', (req, res) => res.status(400).send("not implemented yet"))
  .put('/userapi/hikes/:id', (req, res) => res.status(400).send("not implemented yet"))


  .get('/api/hikes', (req, res) => {
    res.send(getHikes())
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
