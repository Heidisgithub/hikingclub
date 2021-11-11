const HikeEntity = require('./hikeEntity')
const NewsEntity = require('./newsEntity')
const HikerEntity = require('./hikerEntity')
const RegistrationEntity = require('./registrationEntity')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { dbAddHike, dbGetHikes, dbGetOneHike, dbDeleteHike, dbUpdateHike, dbGetNews, dbGetOneNews, dbAddRegistration, dbGetRegistrationsByHikeId, dbGetRegistrations } = require('./db')


const saltRounds = 10;
const jwtKey = "2dadafac3adaa2dasda3dadadad3adasdasd3gr4v54gsgs"

const hikes = []
const hikers = []
const news = [
    { title: "newstitle1", content: "text", picture: "/images/hiker-g109e87bcd_1920.jpg" },
    { title: "newstitle2", content: "text", picture: "/images/hiking-g0342fd644_1920.jpg" },
    { title: "newstitle3", content: "text", picture: "/images/travel-g220a65d21_1920.jpg" },

]

//Hikers functions
const createHiker = (hikerData) => {
    return new HikerEntity(hikerData.firstName, hikerData.lastName, hikerData.email)
}

const makePublicHiker = (internalHiker) => {
    return {
        firstName: internalHiker._firstName,
        lastName: internalHiker._lastName,
        email: internalHiker._email,
        uuid: internalHiker._uuid
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
    return hikers.find(hiker => hiker._uuid === hikerId)
}

const getHikersIndex = (hikerId) => {
    return hikers.findIndex(hiker => hiker.uuid === hikerId)
}

const deleteHiker = (hikerIndex) => {
    hikers.splice(hikerIndex, 1)
}

//Hikes functions
const createHike = (hikeData) => {
    const newHike = new HikeEntity()
    newHike.title = hikeData.title
    newHike.description = hikeData.description
    newHike.location = hikeData.location
    newHike.date = hikeData.date
    newHike.imageUrl = hikeData.imageUrl
    return newHike
}

const createRegistration = (regData) => {
    const newRegistration = new RegistrationEntity()
    newRegistration.name = regData.name
    newRegistration.email = regData.email
    newRegistration.message = regData.message
    newRegistration.date_added = new Date()
    return newRegistration
}


const addHike = async(hike) => {
    return await dbAddHike(hike)
}

const getHikes = async() => {
    const hikes = await dbGetHikes()
    return hikes
        // //return hikes.map(hike => {
        //     return makePublicHike(hike)
        // })
}

const getHikesById = (hikeId) => {
    return dbGetOneHike(hikeId)
        // return hikes.find(hike => hike._uuid === hikeId)
}

const getHikesIndex = (hikeId) => {
    return hikes.findIndex(hike => hike.uuid === hikeId)
}

const deleteHike = (uuid) => {
    dbDeleteHike(uuid)
}

const updateHike = (uuid, hikeData) => {
    return dbUpdateHike(uuid, hikeData)
}

//News functions

const addNews = (article) => {
    news.push(article)
}

const getNews = async() => {
    const news = await dbGetNews()
    return news
}

const getNewsById = (newsId) => {
    return dbGetOneNews(newsId)
}


// registrations

const getRegistrations = (hikeId, regMessage) => {
    return dbGetRegistrationsByHikeId(hikeId, regMessage)
        // return ([{
        //         name: "John Doe",
        //         email: "jd@wat.com",
        //         message: "Hi, I'd like to apply to this hike"
        //     },
        //     {
        //         name: "Jane Doe",
        //         email: "janed@wat.com",
        //         message: "Haafadsga fadsf asdf"
        //     },
        //     {
        //         name: "Elon Musk",
        //         email: "em@wat.com",
        //         message: "I am an elongated musket gun"
        //     },
        // ])
}

const addRegistration = (regMessage) => {
    return dbAddRegistration(regMessage)
}

const getAllRegistrations = async() => {
    const registrations = await dbGetRegistrations()
    console.log(registrations)
    return registrations
}

const users = {}

const getUserByAccount = (account) => {
    return users[account]
}

const addUser = async (email, password, userName) => {
    const result = getUserByAccount(email)
    if (result) {
        return false
    }
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = {
        email: email,
        userName: userName,
        passwordHash: passwordHash
    }
    users[email] = newUser
    console.log(users)
    return newUser
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
    createHike,
    getHikesIndex,
    deleteHike,
    updateHike,
    getRegistrations,
    addRegistration,
    createRegistration,
    getAllRegistrations,
    addUser
}