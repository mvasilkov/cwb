const $actions = document.getElementById('actions')
const $count = document.getElementById('count')

const schedule = fun => {
    const wait = Math.floor(Math.random() * 40)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fun())
        }, wait)
    })
}

let actions = 0
let put = false

function workerInit(key) {
    addEventListener('storage', event => {
        if (event.key == key && event.storageArea == localStorage) {
            actions = 0
            put = false
            schedule(inc)
        }
    })
}

function save(key, count) {
    localStorage.setItem(key, count)
    $count.textContent = count
    $actions.textContent = actions
    if (count >= 100 && !put) {
        parent.putActions(actions)
        put = true
        return false
    }
    return true
}
