const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    openFile: () => ipcRenderer.invoke("openFile"),
    readFile: path => ipcRenderer.invoke("readFile", path),
    checkFileExists: path => ipcRenderer.invoke("checkFileExists", path),
    saveFile: (path, content) => ipcRenderer.invoke("saveFile", path, content),
    deleteFile: path => ipcRenderer.invoke("deleteFile", path),
    createFile: content => ipcRenderer.invoke("createFile", content),
    changeTitle: title => ipcRenderer.invoke("changeTitle", title),
    highlightedCode: (content, path) => ipcRenderer.invoke("highlightedCode", content, path)
});
