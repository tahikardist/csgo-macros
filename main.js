const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        icon: path.join(__dirname, 'src/icon.jpg'),
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#1C1B21',
            symbolColor: '#ffffff',
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'src/js/preload.js')
        },
    })


    mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
