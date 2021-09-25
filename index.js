const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const newsRouter = require('./controllers/api/newsRouter');
const hikersRouter = require('./controllers/api/hikersRouter');
const publicRouter = require('./controllers/public/publicRouter');


express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api/news', newsRouter)
  .use('/api/hikers', hikersRouter)
  .use('/', publicRouter)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  

  .get('/api/hikes', (req, res) => {
    res.send(getHikes())
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
