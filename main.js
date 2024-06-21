const { app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path')
const fileHandler = require('./scripts/fileHandler.js')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "scripts/preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true
    });

    function setWindowTitle(event, title) {
        window.setTitle(title)
    }
  
    const ipcHandlers = {
        openFile: fileHandler.openFile,
        readFile: fileHandler.readFile,
        checkFileExists: fileHandler.checkFileExists,
        saveFile: fileHandler.saveFile,
        deleteFile: fileHandler.deleteFile,
        createFile: fileHandler.createFile,
        changeTitle: setWindowTitle,
        highlightedCode: fileHandler.highlightedCode
    };    

    for (const key in ipcHandlers) {
        ipcMain.handle(key, ipcHandlers[key]);
    }

    window.loadFile("windows/index.html");
    window.webContents.openDevTools()
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
