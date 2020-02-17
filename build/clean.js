const fs = require('fs')
const path = require('path')

const cwb = path.resolve(__dirname, 'cwb.js')
let a = fs.readFileSync(cwb, { encoding: 'utf8' })
a = a.replace(/\n*\/\*![^]*?\*\/\n*/g, b => {
    console.log(`Cleaning up: '''${b}'''`)
    return ''
})
fs.writeFileSync(cwb, a, { encoding: 'utf8' })

const license_txt = path.resolve(__dirname, 'cwb.js.LICENSE.txt')
try {
    fs.unlinkSync(license_txt)
}
catch (err) {
}
