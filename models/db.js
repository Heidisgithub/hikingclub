const pgp = require('pg-promise')()
const fetch = require('node-fetch')
const username = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const HikeEntity = require('./hikeEntity')
const HikerEntity = require('./hikerEntity')
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

const local_uri = `postgres://${username}:${password}@${host}:${port}/${database}`
const uri = process.env.DATABASE_URL
const contentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/`
const contentfulInitObj = (query) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${contentfulAccessToken}`
        },
        body: JSON.stringify({ query })
    }
}


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
    newHike.imageUrl = hikerRec.image_url || 'https://via.placeholder.com/150'
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

function _convertFromRegistrationEntity(registrationEntity) {
    // TODO - Add other keys if we update our MVP keys for the hike entity
    const newRec = {}
    newRec.name = registrationEntity.name
    newRec.email = registrationEntity.email
    newRec.message = registrationEntity.message
    newRec.hike_uuid = registrationEntity.hike_uuid
    newRec.date_added = registrationEntity.date_added
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
        return pgp.as.format("$1:value = $2", [convertedField, hikeData[field]])
    })
    const updateQuery = updateArray.join(", ");
    console.log(`UPDATE hikes SET ${updateQuery} WHERE uuid = ${uuid}`)
    await db.query("UPDATE hikes SET $2:raw WHERE uuid = $1", [uuid, updateQuery])
    return true;
}

async function dbGetNews() {
    const query = `
    {
        newsCollection {
        items {
            title
            sys {id, firstPublishedAt}
            descriptionPreview
            contentfulMetadata {
                tags {
                  id
                  name
                }
            }
            picture { url }
        }
        }
    }`
    let newsArticles
    await fetch(contentfulUrl, contentfulInitObj(query))
        .then((response) => response.json())
        .then(({ data, errors }) => {
            if (errors) {
                console.error(errors);
            }
            console.log(data.newsCollection.items)
                // rerender the entire component with new data
            newsArticles = data.newsCollection.items;
        })
    let mappedNews = newsArticles.map(article => {
        return {
            title: article.title,
            contentPreview: article.descriptionPreview,
            picture: article.picture.url,
            id: article.sys.id,
            publishDate: article.sys.firstPublishedAt,
            tagIds: article.contentfulMetadata.tags.map(tag => {
                return tag.id
            }),
            tags: article.contentfulMetadata.tags.map(tag => {
                return tag.name
            })
        }
    })
    return mappedNews.sort((a, b) => {
        // Returning the hikes in descending order by publishing date
        a = Date.parse(a.publishDate)
        b = Date.parse(b.publishDate)
        if (a > b) {
            return -1
        } else if (a < b) {
            return 1
        } else if (a = b) {
            return 0
        }
    })
}

async function dbGetOneNews(sysId) {
    const query = `
    {
        news (id: "${sysId}") {
          title
          picture {url}
          description {json}
          contentfulMetadata {
            tags {
              id
              name
            }
          }
          sys {
            firstPublishedAt
          }
        }
      }`
    let newsArticle
    await fetch(contentfulUrl, contentfulInitObj(query))
        .then((response) => response.json())
        .then(({ data, errors }) => {
            if (errors) {
                console.error(errors);
            }
            console.log(data.news)
                // rerender the entire component with new data
            newsArticle = data.news
        })

    let contentHTML = documentToHtmlString(newsArticle.description.json)

    return {
        title: newsArticle.title,
        picture: newsArticle.picture.url,
        publishDate: new Date(newsArticle.sys.firstPublishedAt),
        content: contentHTML,
        tagIds: newsArticle.contentfulMetadata.tags.map(tag => {
            return tag.id
        }),
        tags: newsArticle.contentfulMetadata.tags.map(tag => {
            return tag.name
        })
    }
}

async function dbGetRegistrationsByHikeId(uuid) {
    const registrations = await db.query("SELECT * FROM registrations WHERE hike_uuid = $1;", [uuid]);
    return registrations
}

async function dbAddRegistration(regMessage) {
    console.log(regMessage)
    const newRegistration = _convertFromRegistrationEntity(regMessage);
    console.log(newRegistration)

    if (newRegistration.name && newRegistration.email && newRegistration.message) {
        await db.one('INSERT INTO registrations(${this:name}) VALUES(${this:csv}) RETURNING id', newRegistration)
        return true;
    }
    return false
}

//Registrations
async function dbGetRegistrations() {
    const registrations = await db.query(`
        SELECT a.title hike_title, b.id, b.name, b.email, b.message, b.date_added, b.hike_uuid
        FROM registrations AS b
        LEFT JOIN hikes AS a
        ON a.uuid = b.hike_uuid
        ORDER BY date_added DESC;
    `).catch(()=>{return false})
    if (!registrations) {
        return false
    }
    return registrations
}
//Users
async function dbAddUser(user) {
    const newUser = {
        email: user.email,
        password_hash: user.passwordHash,
        user_name: user.userName,
        user_role: user.userRole
    }
    await db.one('INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING id', newUser)
    return true;
}

async function dbGetUserByEmail(email) {
    const user = await db.one(`SELECT * FROM users WHERE email = $1;`, [email]).catch(()=>{
        return false
    });
    if (!user) {
        return false
    }
    const newUser = {
        email: user.email,
        passwordHash: user.password_hash,
        userName: user.user_name,
        userRole: user.user_role
    }
    return newUser
}

module.exports = {
    dbAddHike,
    dbGetHikes,
    dbGetOneHike,
    dbDeleteHike,
    dbUpdateHike,
    dbGetNews,
    dbGetOneNews,
    dbGetRegistrationsByHikeId,
    dbAddRegistration,
    dbGetRegistrations,
    dbAddUser,
    dbGetUserByEmail
}