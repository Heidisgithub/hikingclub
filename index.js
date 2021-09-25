const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const newsRouter = require('./controllers/api/newsRouter');
const hikersRouter = require('./controllers/api/hikersRouter');
const loginRouter = require('./controllers/api/loginRouter');
const hikesRouter = require('./controllers/api/hikesRouter');

express()
    .use(express.json())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api/news', newsRouter)
    .use('/api/hikers', hikersRouter)
    .use('/api/hikes/', hikesRouter)
    .use('/login/', loginRouter)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))