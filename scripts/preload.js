const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openDialog: () => ipcRenderer.invoke('openDialog'),
  getFileContent: (path) => ipcRenderer.invoke('getFileContent', path),
  checkFileExists: (path) => ipcRenderer.invoke('checkFileExists', path),
  saveFile: (path, newContent) => ipcRenderer.invoke('saveFile', path, newContent),
  deleteFile: (path) => ipcRenderer.invoke('deleteFile', path),
  createFile: (content) => ipcRenderer.invoke('createFile', content),
  changeTitle: (newTitle) => ipcRenderer.invoke('changeTitle', newTitle)
})