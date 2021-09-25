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
    set id(id) {
        this._id = id
    }
    get id() {
        return this._id
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

