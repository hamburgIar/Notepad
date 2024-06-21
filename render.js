const fileContent = document.getElementById("fileContent");

const currentFile = {
    name: null,
    path: null,
    isSave: false
};

const Text = {
    NONE: "",
    DEFAULT_TITLE: "Notepad--",
    NOT_SAVED: "• "
}

let lastFileContent = null;

function toggleFileContent(file) {
    fileContent.innerHTML = file;
}

async function updateWindowTitle(title) {
    await api.changeTitle(title);
}

function getFileTitle(toggle) {
    const isSaved = toggle ? Text.NONE : Text.NOT_SAVED

    const title = !currentFile.path ? 
        isSaved + Text.DEFAULT_TITLE :
        isSaved + `${currentFile.name} - ${Text.DEFAULT_TITLE}`

    return title
}

async function setFileSaving(toggle) {
    const title = getFileTitle(toggle)

    currentFile.isSave = toggle

    await updateWindowTitle(title)
}

function updateLastFileContent(content) {
    lastFileContent = content;
}

function setCurrentFileData(filePath, fileName) {
    currentFile.name = fileName;
    currentFile.path = filePath;
}

async function resetFileState() {
    setCurrentFileData(null, null);
    updateLastFileContent(null);

    await setFileSaving(true);
}

async function updateFileContent(filePath, fileName, file) {
    setCurrentFileData(filePath, fileName)
    updateLastFileContent(file);
    toggleFileContent(file);

    await updateWindowTitle(`${fileName} - ${Text.DEFAULT_TITLE}`);
}

async function hideFileDetails() {
    toggleFileContent(Text.NONE);

    await resetFileState();
}

async function saveFile() {
    const currentFileContent = fileContent.innerText;

    if (currentFile.name) {
        const isFileExists = await api.checkFileExists(currentFile.path);
        if (isFileExists) {
            if (currentFileContent === lastFileContent) return;

            await api.saveFile(currentFile.path, currentFileContent);
            await setFileSaving(true)

            updateLastFileContent(currentFileContent);
        }
    } else {
        if (currentFileContent) {
            await createFile(currentFileContent);
        }
    }
}

async function deleteFile() {
    if (currentFile.path) {
        const isFileExists = await api.checkFileExists(currentFile.path);
        if (isFileExists) {
            await api.deleteFile(currentFile.path);

            await hideFileDetails();
        }
    }
}

async function createFile(content = Text.NONE) {
    const fileData = await api.createFile(content);

    if (fileData) {
        const fileName = fileData.name;
        
        await updateFileContent(fileData.path, fileName, content);
        await updateWindowTitle(`${fileName} - ${Text.DEFAULT_TITLE}`);
    }
}

async function loadFile() {
    const fileData = await api.openFile();

    if (fileData) {
        const filePath = fileData.path;
        const fileContent = await api.readFile(filePath);
        
        await updateFileContent(filePath, fileData.name, fileContent);

        return;
    }
}

async function closeFile() {
    await hideFileDetails();
}

export {
    saveFile, 
    closeFile, 
    loadFile, 
    deleteFile,
    createFile, 
    setFileSaving, 
    toggleFileContent
};

export { 
    currentFile,
    fileContent
}
