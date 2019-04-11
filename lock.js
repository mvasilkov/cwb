const sleep = pause => new Promise(resolve => setTimeout(resolve, pause))

async function lock(key, fun) {
    const lockId = '' + Math.random()

    const getvar = a => localStorage.getItem(`Lock.${key}.${a}`)
    const putvar = (a, b) => localStorage.setItem(`Lock.${key}.${a}`, b)

    /* Alur and Taubenfeld's algorithm */
    async function loop() {
        putvar('X', lockId)
        while (getvar('Y')) await sleep()
        putvar('Y', lockId)
        if (getvar('X') != lockId) {
            await sleep(48)
            if (getvar('Y') != lockId)
                return await loop()
            while (getvar('Z')) await sleep()
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
