const { app, BrowserWindow, ipcMain } = require('electron')
const fileHandler = require('./scripts/fileHandler.js');
const path = require('node:path')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true
    })

    ipcMain.handle('openDialog', fileHandler.handleFileOpen)
    ipcMain.handle('getFileContent', fileHandler.readFile)
    ipcMain.handle('checkFileExists', fileHandler.checkFileExists)
    ipcMain.handle('saveFile', fileHandler.saveFile)
    ipcMain.handle('deleteFile', fileHandler.deleteFile)
    ipcMain.handle('createFile', fileHandler.createFile)
    ipcMain.handle('changeTitle', (event, title) => window.setTitle(title))

    window.loadFile('windows/index.html')
    //window.webContents.openDevTools()
}


app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})