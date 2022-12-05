const titleInput = document.querySelector("#post-title");
const contentInput = document.querySelector("#post-content");
const submitButton = document.querySelector("#submit");
const id = submitButton.dataset.id;
const messageBox = document.querySelector("#message-box");


const editPostHandler = async (event) => {
    event.preventDefault();

    clearMessageBox(messageBox);

    const requestBody = {
        title: titleInput.value.trim(),
        contents: contentInput.value.trim(),
    }

    if (!requestBody.title || !requestBody.contents) {
        writeMessageBox(messageBox, "Please provide both a title and content");
        return;
    }


    const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    if (response.ok){
        const responseData = await response.json();
        document.location.replace(responseData.redirect);
    } else {
        const responseData = await response.json();
        writeMessageBox(messageBox, responseData.message);
    }

}



submitButton.addEventListener("click", editPostHandler);