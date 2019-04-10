const $actions = document.getElementById('actions')
const $count = document.getElementById('count')
// const schedule = requestAnimationFrame
const schedule = fun => {
    const wait = Math.floor(Math.random() * 40)
    return new Promise(resolve => {
        setTimeout(() => {
            fun()
            resolve()
        }, wait)
    })
}

let actions = 0

addEventListener('storage', event => {
    if (event.key == 'without_lock_start') {
        actions = 0
        schedule(inc)
    }
})

function save(count) {
    localStorage.setItem('without_lock_count', count)
    $count.textContent = count
    $actions.textContent = actions
    if (count >= 100) {
        parent.putActions(actions)
        return
    }
    schedule(inc)
}
