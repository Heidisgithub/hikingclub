module.exports = class HikeEntity {
    constructor(title, location) {
        this._title = title;
        this._location = location;
        this._registeredHikers = [];
        this._possibleHazards = [];
        this._description = "No description available"
    }
    set distance(distance) {
        this._distance = distance
    }
    get distance() {
        return this._distance
    }
    set duration(duration) {
        this._duration = duration
    }
    get duration() {
        return this._duration
    }
    set registeredHikers(registeredHikers) {
        this._registeredHikers = registeredHikers
    }
    get registeredHikers() {
        return this._registeredHikers
    }
    set id(id) {
        this._id = id
    }
    get id() {
        return this._id
    }
    set description(description) {
        this._description = description
    }
    get description() {
        return this._description
    }
    set maxParticipants(maxParticipants) {
        this._maxParticipants = maxParticipants
    }
    get maxParticipants() {
        return this._maxParticipants
    }
    set date(date) {
        this._date = date
    }
    get date() {
        return this._date
    }
    set difficultyLevel(difficultyLevel) {
        this._difficultyLevel = difficultyLevel
    }
    get difficultyLevel() {
        return this._difficultyLevel
    }
    set possibleHazards(possibleHazards) {
        this._possibleHazards = possibleHazards
    }
    get possibleHazards() {
        return this._possibleHazards
    }
};

