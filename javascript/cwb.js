'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wolfy87_eventemitter_1 = __importDefault(require("wolfy87-eventemitter"));
exports.EventEmitter = wolfy87_eventemitter_1.default;
const objectid_1 = __importDefault(require("../bson/objectid"));
exports.ObjectId = objectid_1.default;
const lock_1 = require("./lock");
exports.sleep = lock_1.sleep;
exports.lock = lock_1.lock;
const cache = Object.create(null);
const shiftInitialCleanup = (t) => Math.floor(0.5 * t * (Math.random() + 1));
class Channel extends wolfy87_eventemitter_1.default {
    constructor(key, queueSize = 64, queueTTL = 6e4) {
        super();
        this.onstorage = (event) => {
            if (event.key != `⭕️${this.key}` || !event.newValue ||
                event.storageArea != localStorage)
                return;
            try {
                this.queueConsume(JSON.parse(event.newValue));
            }
            catch (err) {
                console.error(`Channel(${this.key}): localStorage went bad`);
            }
        };
        this.cleanup = async () => {
            if (this.disposed)
                return;
            await lock_1.lock(this.key, () => {
                const t = Math.floor((Date.now() - this.queueTTL) * 0.001);
                const queue = this.queueLoad().filter(a => {
                    const objectid = new objectid_1.default(a.pk);
                    return objectid.generationTime >= t;
                });
                this.seenEvents = new Set(queue
                    .filter(a => this.seenEvents.has(a.pk))
                    .map(a => a.pk));
                this.queueSave(queue);
            });
            lock_1.sleep(this.queueTTL).then(this.cleanup);
        };
        if (cache[key])
            return cache[key];
        this.key = key;
        this.queueSize = queueSize;
        this.queueTTL = queueTTL;
        this.seenEvents = new Set;
        this.started = Math.floor(Date.now() * 0.001);
        this.disposed = false;
        addEventListener('storage', this.onstorage);
        lock_1.sleep(shiftInitialCleanup(this.queueTTL)).then(this.cleanup);
        cache[key] = this;
    }
    send(event, args, options = {}) {
        var _a;
        if (!Array.isArray(args))
            args = [args];
        const pk = (_a = options.pk, (_a !== null && _a !== void 0 ? _a : (new objectid_1.default).toString()));
        this.seenEvents.add(pk);
        if (options.toSelf)
            this.trigger(event, args);
        return lock_1.lock(this.key, () => {
            const queue = this.queueLoad();
            queue.push({ pk, event, args });
            while (queue.length > this.queueSize) {
                this.seenEvents.delete(queue.shift().pk);
            }
            this.queueSave(queue);
        });
    }
    update() {
        this.queueConsume(this.queueLoad());
    }
    dispose() {
        this.disposed = true;
        removeEventListener('storage', this.onstorage);
        delete cache[this.key];
    }
    queueLoad() {
        try {
            return JSON.parse(localStorage.getItem(`⭕️${this.key}`) || '[]');
        }
        catch (err) {
            return [];
        }
    }
    queueSave(queue) {
        try {
            localStorage.setItem(`⭕️${this.key}`, JSON.stringify(queue));
        }
        catch (err) {
            console.error(`Channel(${this.key}): localStorage went bad`);
        }
    }
    queueConsume(queue) {
        queue.forEach(a => {
            if (this.seenEvents.has(a.pk))
                return;
            this.seenEvents.add(a.pk);
            const objectid = new objectid_1.default(a.pk);
            if (objectid.generationTime < this.started)
                return;
            this.trigger(a.event, a.args);
        });
    }
}
exports.Channel = Channel;
exports.default = Channel;
