const fs = require('fs')
const path = require('path')
const { app } = require('electron')
const chooseAll = () => {
    const historyPath = path.join(app.getPath('exe'), `../history`)
    const list = fs.readdirSync(historyPath)
    return list
}
module.exports = chooseAll