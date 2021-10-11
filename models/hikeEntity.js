const { v4: uuidv4 } = require('uuid');

module.exports = class HikeEntity {
    constructor() {
        this._registeredHikers = [];
        this._possibleHazards = [];
        this._description = "No description available";
        this._uuid = uuidv4();
    }
    set title(title) {
        this._title = title
    }
    get title() {
        return this._title
    }
    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl
    }
    get imageUrl() {
        return this._imageUrl
    }
    set location(location) {
        this._location = location
    }
    get location() {
        return this._location
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
    set uuid(uuid) {
        this._uuid = uuid
    }
    get uuid() {
        return this._uuid
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
    toJSON() {
        return {
          title: this._title,
          description: this._description,
          location: this._location,
          uuid: this._uuid,
          imageUrl: this._imageUrl,
          date: this._date
        }
    }
};

