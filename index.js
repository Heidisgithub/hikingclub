const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT || 5000

const newsRouter = require('./controllers/api/newsRouter');
const hikersRouter = require('./controllers/api/hikersRouter');
const publicRouter = require('./controllers/public/publicRouter');
const loginRouter = require('./controllers/api/loginRouter');
const hikesRouter = require('./controllers/api/hikesRouter');

express()
    .use(express.json())
    .use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api/news', newsRouter)
    .use('/api/hikers', hikersRouter)
    .use('/api/hikes/', hikesRouter)
    .use('/login/', loginRouter)
    .use('/', publicRouter)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')


.get('/api/hikes', (req, res) => {
    res.send(getHikes())
})

.listen(PORT, () => console.log(`Listening on ${ PORT }`))