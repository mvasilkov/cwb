const EventEmitter = require('wolfy87-eventemitter')

const ObjectId = require('./objectid')
const { sleep, lock } = require('./lock')

const cache = Object.create(null)

const shiftInitial = t => Math.floor(0.5 * t * (Math.random() + 1))

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
        sleep(shiftInitial(this.queueTTL)).then(this.cleanup)

        cache[key] = this
    }

    onstorage = event => {
        if (event.key != `⭕️${this.key}` || !event.newValue ||
            event.storageArea != localStorage) return

        try {
            this.queueConsume(JSON.parse(event.newValue))
        }
        catch (err) {
            console.error(`Channel(${this.key}): localStorage went bad`)
        }
    }

    cleanup = async () => {
        await lock(this.key, () => {
            const t = Math.floor((Date.now() - this.queueTTL) / 1e3)
            const queue = this.queueLoad().filter(a => {
                const objectid = new ObjectId(a.pk)
                return objectid.generationTime >= t
            })

            this.seenEvents = new Set(queue
                .map(a => this.seenEvents.has(a.pk) ? a.pk : null)
                .filter(a => !!a))

            this.queueSave(queue)
        })
        sleep(this.queueTTL).then(this.cleanup)
    }

    send(event, args, { pk, toSelf } = {}) {
        if (!Array.isArray(args)) args = [args]
        if (!pk) pk = (new ObjectId).toString()

        this.seenEvents.add(pk)
        if (toSelf) this.trigger(event, args)

        return lock(this.key, () => {
            const queue = this.queueLoad()

            queue.push({ pk, event, args })
            while (queue.length > this.queueSize) {
                this.seenEvents.delete(queue.shift().pk)
            }

            this.queueSave(queue)
        })
    }

    update() {
        this.queueConsume(this.queueLoad())
    }

    queueLoad() {
        try {
            return JSON.parse(localStorage.getItem(`⭕️${this.key}`) || '[]')
        }
        catch (err) {
            return []
        }
    }

    queueSave(queue) {
        try {
            localStorage.setItem(`⭕️${this.key}`, JSON.stringify(queue))
        }
        catch (err) {
            console.error(`Channel(${this.key}): localStorage went bad`)
        }
    }

    queueConsume(queue) {
        queue.forEach(a => {
            if (this.seenEvents.has(a.pk)) return
            this.seenEvents.add(a.pk)

            const objectid = new ObjectId(a.pk)
            if (objectid.generationTime < this.started) return

            this.trigger(a.event, a.args)
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
