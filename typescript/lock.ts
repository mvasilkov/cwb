'use strict'

import ObjectId from '../bson/objectid'

export const sleep = (pause?: number) => new Promise(resolve => setTimeout(resolve, pause))

type CriticalSection<T> = () => T | Promise<T>

/**
 * Locking (synchronization)
 * @param key A string that uniquely identifies the lock.
 * @param fun Critical section. This function can be async.
 * @param wait The timeout interval (optional).
 */
export async function lock<T>(key: string, fun: CriticalSection<T>, wait: number = 9000) {
    const lockId = (new ObjectId).toString()
    let started = Date.now()

    const getvar = (a: string) => localStorage.getItem(`❌${key}.${a}`)
    const putvar = (a: string, b: string) => localStorage.setItem(`❌${key}.${a}`, b)

    const checkSleep = async (a: string) => {
        await sleep()
        if (Date.now() - started > wait) {
            started = Date.now()
            console.error(`lock(${key}): clearing the stalled variable ${a}`)
            putvar(a, '')
        }
    }

    /* Alur and Taubenfeld's algorithm */
    async function loop(): Promise<T> {
        putvar('X', lockId)
        while (getvar('Y')) await checkSleep('Y')
        putvar('Y', lockId)
        if (getvar('X') != lockId) {
            await sleep(48)
            if (getvar('Y') != lockId)
                return await loop()
            while (getvar('Z')) await checkSleep('Z')
        }
        else putvar('Z', '1')

        const result = await fun()

        putvar('Z', '')
        if (getvar('Y') == lockId)
            putvar('Y', '')

        return result
    }

    return await loop()
}
