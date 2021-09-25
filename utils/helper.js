const {addHike, addHiker, addNews} = require('../models/dataService')
const HikeEntity = require('../models/hikeEntity')
const NewsEntity = require('../models/newsEntity')
const HikerEntity = require('../models/hikerEntity')
const { v4: uuidv4 } = require('uuid');

const seedHikes = () => {
    let seededHike = new HikeEntity('First Hike of the year!', 'Munich')
    seededHike.description = 'Join us for a day of fun'
    seededHike.id = uuidv4()
    addHike(seededHike)
    seededHike = new HikeEntity('Second Hike of the year!', 'Berlin')
    seededHike.description = 'Join us for an evening of fun'
    seededHike.id = uuidv4()
    addHike(seededHike)
    seededHike = new HikeEntity('Third Hike of the year!', 'Goppingen')
    seededHike.description = 'Join us for two days of fun'
    seededHike.id = uuidv4()
    addHike(seededHike)
}

const seedHikers = () => {
    let seededHiker = new HikerEntity('John', 'Doe', 'john@doe.com')
    seededHiker.id = uuidv4()
    addHiker(seededHiker)
    seededHiker = new HikerEntity('Jane', 'Doe', 'jane@doe.com')
    seededHiker.id = uuidv4()
    addHiker(seededHiker)
    seededHiker = new HikerEntity('Max', 'Musterman', 'max@muster.com')
    seededHiker.id = uuidv4()
    addHiker(seededHiker)
}

const seedNews = () => {
    let seededNews = new NewsEntity('New hiking trail offer!')
    seededNews.id = uuidv4()
    addNews(seededNews)
    seededNews = new NewsEntity('Come hike with us for Christmas!')
    seededNews.id = uuidv4()
    addNews(seededNews)
    seededNews = new NewsEntity('Hike with our alpacas!')
    seededNews.id = uuidv4()
    addNews(seededNews)
}

const seedData = () => {
    seedHikes()
    seedHikers()
    seedNews()
}

module.exports = { seedHikers, seedHikes, seedNews, seedData }