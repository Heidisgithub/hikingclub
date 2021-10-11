const { v4: uuidv4 } = require('uuid');

module.exports = class HikerEntity {
    constructor(firstName, lastName, email) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._uuid = uuidv4();
    }
    set registeredHikes(registeredHikes) {
        this._registeredHikes = registeredHikes
    }
    get registeredHikes() {
        return this._registeredHikes
    }
    set uuid(uuid) {
        this._uuid = uuid
    }
    get uuid() {
        return this._uuid
    }
};

