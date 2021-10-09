const HikeEntity = require('./hikeEntity')
const NewsEntity = require('./newsEntity')
const HikerEntity = require('./hikerEntity')
const {dbAddHike, dbGetHikes} = require('./db')


const hikes = []
const hikers = []
const news = []

//Hikers functions
const createHiker = (hikerData) => {
    return new HikerEntity(hikerData.firstName, hikerData.lastName, hikerData.email)
}

const makePublicHiker = (internalHiker) => {
    return {
        firstName: internalHiker._firstName,
        lastName: internalHiker._lastName,
        email: internalHiker._email,
        id: internalHiker._id
    }
}

const addHiker = (hiker) => {
    hikers.push(hiker)
}

const getHikers = () => {
    return hikers.map(hiker => {
        return makePublicHiker(hiker)
    })
}

const getHikersById = (hikerId) => {
    return hikers.find(hiker => hiker._id === hikerId)
}

const getHikersIndex = (hikerId) => {
    return hikers.findIndex(hiker => hiker.id === hikerId)
}

const deleteHiker = (hikerIndex) => {
    hikers.splice(hikerIndex, 1)
}

//Hikes functions
const createHike = (hikeData) => {
    return new HikeEntity(hikeData.title, hikeData.location)
}


const addHike = (hike) => {
    dbAddHike(hike)
    hikes.push(hike)
}

const getHikes = async () => {
    const hikes=await dbGetHikes()
    return hikes
    // //return hikes.map(hike => {
    //     return makePublicHike(hike)
    // })
}

const getHikesById = (hikeId) => {
    return hikes.find(hike => hike._id === hikeId)
}

const getHikesIndex = (hikeId) => {
    return hikes.findIndex(hike => hike.id === hikeId)
}

const makePublicHike = (internalHike) => {
    return {
        title: internalHike._title,
        location: internalHike._location,
        registeredHikers: internalHike._registeredHikers,
        possibleHazards: internalHike._possibleHazards,
        description: internalHike._description,
        id: internalHike._id
    }
}

const deleteHike = (hikeIndex) => {
    hikes.splice(hikeIndex, 1)
}

//News functions

const addNews = (article) => {
    news.push(article)
}

const getNews = () => {
    return news
}

const getNewsById = (newsId) => {
    return news.find(article => article._id === newsId)
}

module.exports = {
    addHike,
    addHiker,
    createHiker,
    addNews,
    getHikes,
    getHikers,
    getNews,
    getHikesById,
    getHikersById,
    getNewsById,
    makePublicHiker,
    getHikersIndex,
    deleteHiker,
    makePublicHike,
    createHike,
    getHikesIndex,
    deleteHike
}