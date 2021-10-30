const { v4: uuidv4 } = require('uuid');

module.exports = class RegistrationEntity {
    constructor() {
        this._name = "";
        this._email = "";
        this._message = "No message available";
    }
    set name(name) {
        this._name = name
    }
    get name() {
        return this._name
    }
    set email(email) {
        this._email = email
    }
    get email() {
        return this._email
    }
    set message(message) {
        this._message = message
    }
    get message() {
        return this._message
    }
    set id(id) {
        this._id = id
    }
    get id() {
        return this._id
    }
    set date_added(date_added) {
        this._date_added = date_added
    }
    get date_added() {
        return this._date_added
    }
    set hike_uuid(hike_uuid) {
        this._hike_uuid = hike_uuid
    }
    get hike_uuid() {
        return this._hike_uuid
    }
    toJSON() {
        return {
            name: this._name,
            email: this._email,
            message: this._message,
            id: this._id,
            date_added: this._date_added,
            hike_uuid: this._hike_uuid
        }
    }
};