const fs = require('fs')
const path = require('path')
const { app } = require('electron')

const create = (params) => {
    const { id, name } = params
    const arr = []
    const historyPath = path.join(app.getPath('exe'), `../history`)
    fs.appendFileSync(path.join(historyPath, `${name + id}.json`), JSON.stringify(arr))
    return true;
}
module.exports = create