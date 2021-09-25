const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const hikesRouter = require('./controllers/hikeController')
const loginRouter = require('./controllers/loginController')

express()
    .use(express.json())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api/hikes/', hikesRouter)
    .use('/login/', loginRouter)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))