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
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 500,
        show: false, // 初始不显示窗口
        frame: false, // 去掉窗口边框
        backgroundColor: '#222', // 设置背景颜色
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 需要使用 node 模块
        }
    })
    server(process.path, app)

    // 加载网页
    mainWindow.loadURL("http://localhost:3000")

    // 当窗口关闭时触发
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    // 当窗口完成加载时触发
    mainWindow.webContents.on('did-finish-load', function () {
        // 给网页发送一条消息
        // mainWindow.reload()
        // mainWindow.webContents.send('message', 'hello world')
    })

    // 创建系统托盘图标
    tray = new Tray(path.join(process.path, '../ee.png'))

    // tray = new Tray(path.join(__dirname, 'ee.png'))
    // 当托盘图标被点击时触发
    tray.on('click', function (event, bounds) {
        // 获取当前屏幕的宽度和高度
        let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize

        // 计算窗口的位置
        let x = Math.round(bounds.x + bounds.width / 2 - mainWindow.getSize()[0] / 2)
        let y = Math.round(-height - bounds.y)

        // 如果窗口已经显示，则隐藏窗口，否则显示窗口
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            mainWindow.setPosition(x, y) // 设置窗口位置
            mainWindow.show()
        }
    })

    // 当窗口失去焦点时触发
    mainWindow.on('blur', function () {
        // 隐藏窗口
        mainWindow.hide()
    })
}

// 当 Electron 完成初始化时触发
app.on('ready', createWindow)

// 当所有窗口都关闭时触发
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 当 Electron 重新激活时触发
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})