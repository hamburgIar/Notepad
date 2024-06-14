import {saveFile, closeFile, deleteFile, loadFile, createFile} from './render.js'

const loadFileButton = document.getElementById('loadFile')
const saveFileButton = document.getElementById('saveFile')
const deleteFileButton = document.getElementById('deleteFile')
const closeFileButton = document.getElementById('closeFile')
const createFileButton = document.getElementById('createFile')

async function keydownHandler(event) {
    if (event.ctrlKey) {
        switch (event.code) {
            case "KeyS":
                await saveFile()
                break
            case "KeyX":
                await closeFile()
                break
            case "KeyQ":
                await loadFile()
                break
            case "KeyN":
                await createFile()
                break
        }
    }
}

loadFileButton.addEventListener('click', loadFile)
saveFileButton.addEventListener('click', saveFile)
deleteFileButton.addEventListener('click', deleteFile)
closeFileButton.addEventListener('click', closeFile)
createFileButton.addEventListener('click', async () => await createFile())

document.addEventListener("keydown", keydownHandler)
