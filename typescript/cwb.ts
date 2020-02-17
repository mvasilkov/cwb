'use strict'

import EventEmitter from 'wolfy87-eventemitter'

import ObjectId from '../bson/objectid'
import { sleep, lock } from './lock'

const cache: { [key: string]: Channel } = Object.create(null)

const shiftInitialCleanup = (t: number) => Math.floor(0.5 * t * (Math.random() + 1))

type QueuedEvent = {
    pk: string
    event: string
    args: any[]
}

interface SendOptions {
    pk?: string
    toSelf?: boolean
}

class Channel extends EventEmitter {
    key!: string
    queueSize!: number
    queueTTL!: number
    seenEvents!: Set<string>
    started!: number
    disposed!: boolean

    constructor(key: string, queueSize = 64, queueTTL = 6e4) {
        super()

        if (cache[key]) return cache[key]

        this.key = key
        this.queueSize = queueSize
        this.queueTTL = queueTTL
        this.seenEvents = new Set
        this.started = Math.floor(Date.now() * 0.001)
        this.disposed = false

        addEventListener('storage', this.onstorage)
        sleep(shiftInitialCleanup(this.queueTTL)).then(this.cleanup)

        cache[key] = this
    }

    onstorage = (event: StorageEvent) => {
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
        if (this.disposed) return

        await lock(this.key, () => {
            const t = Math.floor((Date.now() - this.queueTTL) * 0.001)
            const queue = this.queueLoad().filter(a => {
                const objectid = new ObjectId(a.pk)
                return objectid.generationTime >= t
            })

            this.seenEvents = new Set(queue
                .filter(a => this.seenEvents.has(a.pk))
                .map(a => a.pk))

            this.queueSave(queue)
        })
        sleep(this.queueTTL).then(this.cleanup)
    }

    send(event: string, args: any[], options: SendOptions = {}) {
        if (!Array.isArray(args)) args = [args]
        const pk = options.pk ?? (new ObjectId).toString()

        this.seenEvents.add(pk)
        if (options.toSelf) this.trigger(event, args)

        return lock(this.key, () => {
            const queue = this.queueLoad()

            queue.push({ pk, event, args })
            while (queue.length > this.queueSize) {
                this.seenEvents.delete(queue.shift()!.pk)
            }

            this.queueSave(queue)
        })
    }

    update() {
        this.queueConsume(this.queueLoad())
    }

    dispose() {
        this.disposed = true
        removeEventListener('storage', this.onstorage)
        delete cache[this.key]
    }

    queueLoad(): QueuedEvent[] {
        try {
            return JSON.parse(localStorage.getItem(`⭕️${this.key}`) || '[]')
        }
        catch (err) {
            return []
        }
    }

    queueSave(queue: QueuedEvent[]) {
        try {
            localStorage.setItem(`⭕️${this.key}`, JSON.stringify(queue))
        }
        catch (err) {
            console.error(`Channel(${this.key}): localStorage went bad`)
        }
    }

    queueConsume(queue: QueuedEvent[]) {
        queue.forEach(a => {
            if (this.seenEvents.has(a.pk)) return
            this.seenEvents.add(a.pk)

            const objectid = new ObjectId(a.pk)
            if (objectid.generationTime < this.started) return

            this.trigger(a.event, a.args)
        })
    }
}

export default Channel

export {
    Channel,
    EventEmitter,
    ObjectId,
    sleep,
    lock,
}
