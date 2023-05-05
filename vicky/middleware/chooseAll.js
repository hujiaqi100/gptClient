const fs = require('fs')
const path = require('path')
const { app } = require('electron')
const chooseAll = () => {
    const list = fs.readdirSync(path.join(app.getPath('exe'), `../history`))
    return list
}
module.exports = chooseAll