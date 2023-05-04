const fs = require('fs')
const path = require('path')
const { app } = require('electron')

const dd = (aa) => {
    const { file } = aa
    const currentPath = path.join(app.getPath('exe'), `../history/${file}`)
    fs.rmSync(currentPath)
    return true
}
module.exports = dd