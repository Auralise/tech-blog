const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#register-submit")
const messageBox = document.querySelector("#message-box");

const registrationHandler = async (event) => {
    event.preventDefault();

    messageBox.textContent = "";
    messageBox.classList.remove("error-text");

    const requestBody = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,

    }

    //input validation
    if (!requestBody.username && requestBody.email && requestBody.password) {
        messageBox.classList.add("error-text");
        messageBox.textContent = "Please enter a username, password and email";
        return;
    } else if (requestBody.username.length < 3 || !requestBody.username.match(/^[a-z]+[a-z0-9]{2,14}$/i)) {
        messageBox.classList.add("error-text");
        messageBox.textContent = "Please enter an alphanumeric username, starting with a letter which is between 3 and 15 characters long";
    } else if (!requestBody.email.match(/^[a-z0-9]+(?:[._-][a-z0-9]+|[a-z0-9]*)*@[a-z0-9]+\.(?:(com)|(org)|(net))(?:.[a-z]{2,2})?$/i)) {
        messageBox.classList.add("error-text");
        messageBox.textContent = "Please enter a valid email address";
    } else if (!requestBody.password.length < 8) {
        messageBox.classList.add("error-text");
        messageBox.textContent = "Please enter a password which is 8 or more characters long"
    }

    const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        document.location.replace("/");
    } else if (response.status === 500) {
        const responseData = await response.json();
        messageBox.textContent = responseData.message;
    }


}


submitButton.addEventListener("click", registrationHandler);