'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectid_1 = __importDefault(require("../bson/objectid"));
/**
 * An asynchronous sleep function.
 * @param pause Wait time in milliseconds (optional)
 */
exports.sleep = (pause) => new Promise(resolve => setTimeout(resolve, pause));
/**
 * Locking (synchronization)
 * @param key A string that uniquely identifies the lock.
 * @param fun Critical section. This function can be async.
 * @param wait The timeout interval (optional).
 */
async function lock(key, fun, wait = 9000) {
    const lockId = (new objectid_1.default).toString();
    let started = Date.now();
    const getvar = (a) => localStorage.getItem(`❌${key}.${a}`);
    const putvar = (a, b) => localStorage.setItem(`❌${key}.${a}`, b);
    const checkSleep = async (a) => {
        await exports.sleep();
        if (Date.now() - started > wait) {
            started = Date.now();
            console.error(`lock(${key}): clearing the stalled variable ${a}`);
            putvar(a, '');
        }
    };
    /**
     * Alur and Taubenfeld's algorithm.
     */
    async function loop() {
        putvar('X', lockId);
        while (getvar('Y'))
            await checkSleep('Y');
        putvar('Y', lockId);
        if (getvar('X') != lockId) {
            await exports.sleep(48);
            if (getvar('Y') != lockId)
                return await loop();
            while (getvar('Z'))
                await checkSleep('Z');
        }
        else
            putvar('Z', '1');
        const result = await fun();
        putvar('Z', '');
        if (getvar('Y') == lockId)
            putvar('Y', '');
        return result;
    }
    return await loop();
}
exports.lock = lock;
exports.default = lock;
