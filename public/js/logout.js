const logoutButton = document.querySelector("#logout");

const logoutHandler = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
        body: "",
    });

    if(response.ok){
        document.location.replace("/");
    } else {
        // Decide what to do with errors
        document.location.replace("/");
    }
}



logoutButton.addEventListener("click", logoutHandler);