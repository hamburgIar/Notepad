const fs = require('fs/promises');
const { dialog } = require('electron')
const path = require("path")

const openDialogConfig = {
    title: 'Select a file',
    buttonLabel: 'Open',
    properties: ['openFile']
};

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog(openDialogConfig)

    if (!canceled) {
        const filePath = filePaths[0]
        return [filePath, path.basename(filePath)]
    }
    
    return null;
}

async function readFile(event, filePath) {
    return await fs.readFile(filePath, { encoding: 'utf8' })
        .then((data) => data)
        .catch(() => null)
}

async function checkFileExists(event, filePath) {
    return await fs.access(filePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

async function saveFile(event, filePath, fileContent) {
    return await fs.writeFile(filePath, fileContent)
        .then(() => true)
        .catch(() => false)

}

async function deleteFile(event, filePath) {
    return await fs.unlink(filePath)
        .then(() => true)
        .catch(() => false)
}

async function createFile(event, fileContent) {
    return await dialog.showSaveDialog({})
        .then(result => {
            const filePath = result.filePath
            if (filePath) {
                console.log(filePath, fileContent)
                fs.writeFile(filePath, fileContent)
                return [filePath, path.basename(filePath)]
            }

            return false
        })
        .catch(error => false)
}


module.exports = {
    handleFileOpen,
    readFile,
    checkFileExists,
    saveFile,
    deleteFile,
    createFile
};