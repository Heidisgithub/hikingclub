const {addHike, addHiker, addNews} = require('../models/dataService')
const HikeEntity = require('../models/hikeEntity')
const NewsEntity = require('../models/newsEntity')
const HikerEntity = require('../models/hikerEntity')

const seedHikes = () => {
    let seededHike = new HikeEntity('First Hike of the year!', 'Munich')
    seededHike.description = 'Join us for a day of fun'
    addHike(seededHike)
    seededHike = new HikeEntity('Second Hike of the year!', 'Berlin')
    seededHike.description = 'Join us for an evening of fun'
    addHike(seededHike)
    seededHike = new HikeEntity('Third Hike of the year!', 'Goppingen')
    seededHike.description = 'Join us for two days of fun'
    addHike(seededHike)
}

const seedHikers = () => {
    let seededHiker = new HikerEntity('John', 'Doe', 'john@doe.com')
    addHiker(seededHiker)
    seededHiker = new HikerEntity('Jane', 'Doe', 'jane@doe.com')
    addHiker(seededHiker)
    seededHiker = new HikerEntity('Max', 'Musterman', 'max@muster.com')
    addHiker(seededHiker)
}

const seedNews = () => {
    let seededNews = new NewsEntity('New hiking trail offer!')
    addNews(seededNews)
    seededNews = new NewsEntity('Come hike with us for Christmas!')
    addNews(seededNews)
    seededNews = new NewsEntity('Hike with our alpacas!')
    addNews(seededNews)
}

const seedData = () => {
    seedHikes()
    seedHikers()
    seedNews()
}

module.exports = { seedData }