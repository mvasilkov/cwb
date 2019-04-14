const EventEmitter = require('wolfy87-eventemitter')

const ObjectId = require('./objectid')
const { sleep, lock } = require('./lock')

const cache = Object.create(null)

class Channel extends EventEmitter {
    constructor(key, queueSize = 64, queueTTL = 6e4) {
        if (cache[key]) return cache[key]

        super()
        this.key = key
        this.queueSize = queueSize
        this.queueTTL = queueTTL
        this.seenEvents = new Set
        this.started = Math.floor(Date.now() / 1e3)

        addEventListener('storage', this.onstorage)

        cache[key] = this
    }

    onstorage = event => {
        if (event.key != `⭕️${this.key}` || !event.newValue ||
            event.storageArea != localStorage) return

        try {
            JSON.parse(event.newValue).forEach(a => {
                if (this.seenEvents.has(a.pk)) return
                this.seenEvents.add(a.pk)

                const objectid = new ObjectId(a.pk)
                if (objectid.generationTime < this.started) return

                this.trigger(a.event, a.args)
            })
        }
        catch (err) {
            console.error(`Channel(${this.key}): localStorage went bad`)
        }
    }

    send(event, args, { pk, toSelf } = {}) {
        if (!Array.isArray(args)) args = [args]
        if (!pk) pk = (new ObjectId).toString()

        this.seenEvents.add(pk)

        return lock(this.key, () => {
            let queue
            try {
                queue = JSON.parse(localStorage.getItem(`⭕️${this.key}`) || '[]')
            }
            catch (err) {
                queue = []
            }

            queue.push({ pk, event, args })
            while (queue.length > this.queueSize) {
                this.seenEvents.delete(queue.shift().pk)
            }

            try {
                localStorage.setItem(`⭕️${this.key}`, JSON.stringify(queue))
            }
            catch (err) {
                console.error(`Channel(${this.key}): localStorage went bad`)
            }

            if (toSelf) this.trigger(event, args)
        })
    }
}

module.exports = {
    __esModule: true,
    default: Channel,
    Channel,
    EventEmitter,
    ObjectId,
    sleep,
    lock,
}
