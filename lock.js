const sleep = pause => new Promise(resolve => setTimeout(resolve, pause))

async function lock(key, wait, fun) {
    if (typeof wait == 'function') {
        fun = wait
        wait = 9000
    }

    const lockId = '' + Math.random()
    let started = Date.now()

    const getvar = a => localStorage.getItem(`❌${key}.${a}`)
    const putvar = (a, b) => localStorage.setItem(`❌${key}.${a}`, b)

    const checkSleep = async a => {
        await sleep()
        if (Date.now() - started > wait) {
            started = Date.now()
            console.error(`lock(${key}): clearing the stalled variable ${a}`)
            putvar(a, '')
        }
    }

    /* Alur and Taubenfeld's algorithm */
    async function loop() {
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
