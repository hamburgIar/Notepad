const fileContent = document.getElementById('fileContent')

const currentFile = {
    name: null,
    path: null
}

let lastFileContent = null

const defaultTitle = "Notepad--"

function toggleFileContent(file = "") {
    fileContent.innerText = file
}

async function updateWindowTitle(title = defaultTitle) {
    await api.changeTitle(title)
}

function updateLastFileContent(content = null) {
    lastFileContent = content
}

function resetFileState() {
    currentFile.name = null
    currentFile.path = null

    updateLastFileContent()
  }

async function updateFileContent(filePath, fileName, file) {
    currentFile.path = filePath
    currentFile.name = fileName

    updateLastFileContent(file)
    toggleFileContent(file)

    await updateWindowTitle(`${fileName} - ${defaultTitle}`)
}

async function hideFileDetails() {
    resetFileState()    
    toggleFileContent()

    await updateWindowTitle(`${defaultTitle}`)
}

async function saveFile() {
    const currentFileContent = fileContent.innerText

    if (currentFile.name) {
        const isFileExists = await api.checkFileExists(currentFile.path)
        if (isFileExists) {
            if (currentFileContent === lastFileContent) return
            updateLastFileContent(currentFileContent)
            await api.saveFile(currentFile.path, currentFileContent)
        }
    } 
    else {
        if (currentFileContent) {
            await createFile(currentFileContent)
        }
    }
}

async function deleteFile() {
    if (currentFile.path) {
        const isFileExists = await api.checkFileExists(currentFile.path)
        if (isFileExists) {
            const isDelete = await api.deleteFile(currentFile.path)

            if (isDelete) {
                await hideFileDetails()

                return
            }
        }
    }
}

async function createFile(content = "") {
    const fileData = await api.createFile(content),
        filePath = fileData[0],
        fileName = fileData[1] 
    if (filePath) {
        updateFileContent(filePath, fileName, content)
        await updateWindowTitle(`${fileName} - ${defaultTitle}`)
    }
}

async function loadFile() {
    const fileData = await api.openDialog()

    if (fileData) {
        const filePath = fileData[0],
            fileName = fileData[1],
            file = await api.getFileContent(filePath)

        await updateFileContent(filePath, fileName, file)

        return
    }
}

async function closeFile() {
    if (currentFile.path) {
        await hideFileDetails()
    }
}

export {saveFile, closeFile, loadFile, deleteFile, createFile}