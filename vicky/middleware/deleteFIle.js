const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { app } = require('electron')
const dd = (aa) => {
    const { file } = aa
    const historyPath = path.join(app.getPath('exe'), `../history`)
    execSync(`rm -rf ${path.join(historyPath, file)}`)
    // fs.rmSync(currentPath)
    return true
}
module.exports = dd