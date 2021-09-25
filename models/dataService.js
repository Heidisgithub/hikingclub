const HikeEntity = require('./hikeEntity')
const NewsEntity = require('./newsEntity')
const HikerEntity = require('./hikerEntity')

const hikes = []
const hikers = []
const news = []

const addHike = (hike) => {
    hikes.push(hike)
}

const addHiker = (hiker) => {
    hikers.push(hiker)
}

const addNews = (newsArticle) => {
    news.push(newsArticle)
}

const getHikes = () => {
    return hikes
}

const getHikers = () => {
    return hikers
}

const getNews = () => {
    return news
}



module.exports = { addHike, addHiker, addNews, getHikes, getHikers, getNews }