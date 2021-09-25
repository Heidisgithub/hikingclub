module.exports = class HikerEntity {
    constructor(firstName, lastName, email) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }
    set registeredHikes(registeredHikes) {
        this._registeredHikes = registeredHikes
    }
    get registeredHikes() {
        return this._registeredHikes
    }
    set id(id) {
        this._id = id
    }
    get id() {
        return this._id
    }
};

