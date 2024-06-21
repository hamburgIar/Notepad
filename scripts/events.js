import {
    saveFile,
    closeFile,
    deleteFile,
    loadFile,
    createFile,
    currentFile,
    setFileSaving,
    toggleFileContent,
    fileContent
} from "./render.js";

import {
    getCursorPosition,
    setCursorPosition
} from "./cursor.js"

let theme = true;

async function handleKeyCombination(event) {
    if (event.ctrlKey && event.shiftKey) {
        switch (event.code) {
            case "KeyX":
                await closeFile();
                break;
            case "KeyQ":
                await loadFile();
                break;
            case "KeyN":
                await createFile();
                break;
            case "KeyB":
                if (
                    currentFile.path &&
                    confirm("Вы действительно хотите удалить файл?")
                ) {
                    await deleteFile();
                }
                break;
        }
    } else if (event.ctrlKey && event.code === "KeyS") {
        await saveFile();
    } else if (event.code === "F1") {
        swithTheme()
    }
}

function swithTheme() {
    const linkElement = document.getElementById("theme");

    theme = !theme

    linkElement.href = theme
        ? "../styles/darkTheme.css"
        : "../styles/lightTheme.css";
}

function insertTab() {
    let selection = window.getSelection();
    selection.collapseToStart();
    let range = selection.getRangeAt(0);
    range.insertNode(document.createTextNode("    "));
    selection.collapseToEnd();
}

fileContent.addEventListener("input", async (event) => {
    if (currentFile.path) {
        const currentCursorPosition = getCursorPosition();
        const highlightCode = await api.highlightedCode(fileContent.innerText,currentFile.path);

        toggleFileContent(highlightCode);
        setCursorPosition(currentCursorPosition);
    }

    await setFileSaving(false);
});

fileContent.addEventListener("keydown", async (event) => {
    if (event.key === "Tab") {
        event.preventDefault();

        insertTab()
    }
});

document.addEventListener("keydown", handleKeyCombination);
