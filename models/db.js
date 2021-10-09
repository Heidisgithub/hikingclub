const pgp = require('pg-promise')()
const username = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE

const local_uri = `postgres://${username}:${password}@${host}:${port}/${database}`
const uri = process.env.DATABASE_URL


console.log(uri)
let db

if (process.env.DATABASE_URL) {
    db = pgp({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
} else {

    db = pgp({
        connectionString: local_uri,
        ssl: { rejectUnauthorized: false }
    })
}

async function dbAddHike(hike) {
    console.log(hike)
    const newHike = {
        title: hike._title,
        description: hike._description,
        location: hike._location,
        uuid: hike._id
    }

    const result = await db.query('INSERT INTO hikes(${this:name}) VALUES(${this:csv})', newHike)
    return newHike;
}

async function dbGetHikes() {
    const hikes = await db.query(`
    SELECT uuid id, title, description, location
    FROM hikes
    `);
    console.log(hikes)
    return hikes
}


module.exports = {
    dbAddHike,
    dbGetHikes
}