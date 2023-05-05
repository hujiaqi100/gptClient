const fs = require('fs')
const path = require('path')
const { app } = require('electron')

const chooseFile = (params) => {
    const { id, name } = params
    const historyPath = path.join(app.getPath('exe'), `../history`)
    if (name && id) {
        const currentPath = path.join(historyPath, name)
        console.log();
        const data = fs.readFileSync(currentPath, 'utf-8')
        return data
    }
    return ""
}
module.exports = chooseFile;