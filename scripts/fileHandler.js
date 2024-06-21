const { dialog } = require("electron");

const fs = require("fs/promises");
const path = require("path");
const hljs = require('highlight.js/lib/core');
const lf = require("./languages.js")

const languages = lf.getLanguages()

const openDialogConfig = {
    title: "Select a file",
    buttonLabel: "Open",
    properties: ["openFile"],
};

async function openFile() {
    const { canceled, filePaths } = await dialog.showOpenDialog(openDialogConfig);

    if (!canceled) {
        const filePath = filePaths[0];
        const fileName = path.basename(filePath);

        return { path: filePath, name: fileName };
    }

    return null;
}

async function readFile(event, filePath) {
    return await fs.readFile(filePath, { encoding: "utf8" })
        .then(async data => {
            data.replace(/\t/g, '    ')

            return await highlightContent(data, filePath)
        })
        .catch(() => null);
}

async function checkFileExists(event, filePath) {
    return await fs.access(filePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}

async function saveFile(event, filePath, fileContent) {
    return await fs.writeFile(filePath, fileContent)
        .then(() => true)
        .catch(() => false);
}

async function deleteFile(event, filePath) {
    return await fs.unlink(filePath)
        .then(() => true)
        .catch(() => false);
}

async function createFile(event, fileContent) {
    return await dialog.showSaveDialog({})
        .then((result) => {
            const filePath = result.filePath;
            if (filePath) {
                fs.writeFile(filePath, fileContent);

                return { path: filePath, name: path.basename(filePath) };
            }

            return false;
        })
        .catch((error) => false);
}

function highlightContent(fileContent, filePath) {
    const fileExtension = path.extname(filePath).toLowerCase().replace(/^\./, "")

    for (const [key, language] of Object.entries(languages)) {
        if (language.extensions.includes(fileExtension)) {
            return hljs.highlight(fileContent, { language: key }).value;
        }
    }
}
 
function highlightedCode(event, fileContent, filePath) {
    return highlightContent(fileContent, filePath)
}

lf.loadLanguages()

module.exports = {
    openFile,
    readFile,
    checkFileExists,
    saveFile,
    deleteFile,
    createFile,
    highlightedCode
};
