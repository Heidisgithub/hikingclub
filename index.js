const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { seedData } = require('./utils/helper')
const {getHikes} = require('./models/dataService')

seedData()

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/api/hikes', (req, res) => {
    res.send(getHikes())
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
