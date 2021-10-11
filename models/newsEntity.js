module.exports = class NewsEntity {
    constructor(title) {
        this._title = title;
        this._description = "No description available";
    }
    set description(description) {
        this._description = description
    }
    get description() {
        return this._description
    }
    set uuid(uuid) {
        this._uuid = uuid
    }
    get uuid() {
        return this._uuid
    }
    set tags(tags) {
        this._tags = tags
    }
    get tags() {
        return this._tags
    }
    set author(author) {
        this._author = author
    }
    get author() {
        return this._author
    }
    set date(date) {
        this._date = date
    }
    get date() {
        return this._date
    }
};

