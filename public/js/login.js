const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#login-submit");
const messageBox = document.querySelector("#message-box");


const loginHandler = async (event) => {
    event.preventDefault();

    clearMessageBox(messageBox);

    const requestBody = {
        email: emailInput.value,
        password: passwordInput.value,
    }

    if (!requestBody.email || !requestBody.password){
        writeMessageBox(messageBox, "Please enter an email and password");
        return;
    }

    const response = await fetch ("/api/user/login", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(requestBody),
    });

    if(response.ok){
        document.location.replace("/");
    } else if(response.status === 500){
        //redirect to server error page?
        const responseData = await response.json();
        writeMessageBox(messageBox, responseData.message);
    } else {
        //User input error
        const responseData = await response.json();
        writeMessageBox(messageBox, responseData.message);
    }


}

submitButton.addEventListener("click", loginHandler);