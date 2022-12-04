/* eslint-disable no-unused-vars */
const writeMessageBox = (messageBoxElement, text) => {
    messageBoxElement.classList.add("error-text");
    messageBoxElement.textContent = text;
}

const clearMessageBox = (messageBoxElement) => {
    messageBoxElement.classList.remove("error-text");
    messageBoxElement.textContent = "";
}
