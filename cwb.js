const EventEmitter = require('wolfy87-eventemitter')

const ObjectId = require('./objectid')
const { sleep, lock } = require('./lock')

const cache = Object.create(null)

class Channel extends EventEmitter {
    constructor(key) {
        if (cache[key]) return cache[key]

        cache[key] = this
    }
}

module.exports = {
    __esModule: true,
    default: Channel,
    EventEmitter,
    ObjectId,
    sleep,
    lock,
}
