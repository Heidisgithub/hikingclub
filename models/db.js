const pgp = require('pg-promise')()
const username = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE
const HikeEntity = require('./hikeEntity')
const HikerEntity = require('./hikerEntity')

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

function _convertToHikeEntity(hikerRec) {
    const newHike = new HikeEntity()
        // TODO - Add other keys if we update our MVP keys for the hike entity
    newHike.title = hikerRec.title
    newHike.description = hikerRec.description
    newHike.location = hikerRec.location
    newHike.uuid = hikerRec.uuid
    newHike.date = hikerRec.date
    newHike.imageUrl = hikerRec.image_url
    return newHike
}

function _convertFromHikeEntity(hikeEntity) {
    // TODO - Add other keys if we update our MVP keys for the hike entity
    const newRec = {}
    newRec.title = hikeEntity.title
    newRec.description = hikeEntity.description
    newRec.location = hikeEntity.location
    newRec.uuid = hikeEntity.uuid
    newRec.date = hikeEntity.date
    newRec.image_url = hikeEntity.imageUrl
    return newRec
}

async function dbGetOneHike(uuid) {
    const hike = await db.one("SELECT * FROM hikes WHERE uuid = $1;", [uuid]);
    return _convertToHikeEntity(hike)
}

async function dbAddHike(hikeEntity) {
    const newHike = _convertFromHikeEntity(hikeEntity)
    await db.one('INSERT INTO hikes(${this:name}) VALUES(${this:csv}) RETURNING uuid', newHike)
    return dbGetOneHike(newHike.uuid);
}

async function dbGetHikes() {
    const hikes = await db.query(`
    SELECT *
    FROM hikes
    `);
    return hikes.map(hike => _convertToHikeEntity(hike))
}

async function dbDeleteHike(uuid) {
    await db.query("DELETE FROM hikes WHERE uuid = $1", [uuid]);
    return true;
}

async function dbUpdateHike(uuid, hikeData) {
    const fieldsArray = Object.keys(hikeData);
    let updateArray = fieldsArray.map(field => {
        let convertedField = field;
        // TODO in case of multiple values separated by an _ we should consider a conversion or switch here instead
        if (convertedField === "imageUrl") {
            convertedField = "image_url";
        }
        return `${convertedField} = '${hikeData[field]}'`
    })
    const updateQuery = updateArray.join(", ");
    console.log(`UPDATE hikes SET ${updateQuery} WHERE uuid = ${uuid}`)
    await db.query("UPDATE hikes SET $2:raw WHERE uuid = $1", [uuid, updateQuery])
    return true;
}


module.exports = {
    dbAddHike,
    dbGetHikes,
    dbGetOneHike,
    dbDeleteHike,
    dbUpdateHike
}