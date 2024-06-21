import { fileContent } from "./render.js";

function getCursorPosition() {
    let selection = document.getSelection();
    let range = new Range();
 
    range.setStart(fileContent, 0);
    range.setEnd(selection.anchorNode, selection.anchorOffset);

    return range.toString().length;
}

function setCursorPosition(position) {
    let child = fileContent.firstChild;

    while (position > 0) {
        let length = child.textContent.length;
        if (position > length) {
            position -= length;
            child = child.nextSibling;
        } else {
            if (child.nodeType == 3)
                return document.getSelection().collapse(child, position);
            child = child.firstChild;
        }
    }
}

export { 
    getCursorPosition, 
    setCursorPosition 
}