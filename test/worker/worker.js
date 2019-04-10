const $actions = document.getElementById('actions')
const $count = document.getElementById('count')
// const schedule = requestAnimationFrame
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

addEventListener('storage', event => {
    if (event.key == 'without_lock_start' || event.key == 'with_lock_start') {
        actions = 0
        schedule(inc)
    }
})

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
