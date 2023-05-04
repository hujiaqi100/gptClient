const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { app } = require('electron')

const write = (datas) => {
    const { file, content, role } = datas
    const currentPath = path.join(app.getPath('exe'), `../history/${file}`)
    const data = fs.readFileSync(currentPath, 'utf-8')
    const newArr = _.cloneDeep(JSON.parse(data))
    newArr.push({ role, content })
    fs.writeFileSync(currentPath, JSON.stringify(newArr))
    return true

}
module.exports = write