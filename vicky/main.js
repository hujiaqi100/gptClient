const { app, Menu, ipcMain, ipcRenderer, BrowserWindow, Tray, nativeImage } = require('electron')
const server = require('./index.js')
const path = require('path')
let mainWindow
let tray
// process.env.Mode = "development"

process.env.Mode = "production"
process.akPath = process.env.Mode = "development" ? path.join(app.getAppPath(), 'ak') : path.join(app.getPath('exe'), `../ak`)
process.historyFilePath = process.env.Mode = "development" ? path.join(app.getAppPath(), 'history') : path.join(app.getPath('exe'), `../history`)
process.path = process.env.Mode == 'development' ? app.getAppPath() : app.getPath('exe')
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 500,
        show: false,
        frame: false,
        backgroundColor: '#222',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    server(process.path, app)

    mainWindow.loadURL("http://localhost:3000")

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.webContents.on('did-finish-load', function () {
    })

    tray = new Tray(path.join(process.path, '../ee.png'))

    tray.on('click', function (event, bounds) {
        let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize

        let x = Math.round(bounds.x + bounds.width / 2 - mainWindow.getSize()[0] / 2)
        let y = Math.round(-height - bounds.y)

        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            mainWindow.setPosition(x, y)
            mainWindow.show()
        }
    })

    mainWindow.on('blur', function () {
        mainWindow.hide()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})