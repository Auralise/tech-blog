const titleInput = document.querySelector("#post-title");
const contentInput = document.querySelector("#post-content");
const submitButton = document.querySelector("#submit");
const messageBox = document.querySelector("#message-box");


const newPostHandler = async (event) => {
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


    const response = await fetch("/api/post/create", {
        method: "POST",
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



submitButton.addEventListener("click", newPostHandler);