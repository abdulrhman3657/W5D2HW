let signup_btn = document.getElementById("signup-btn");
let signup_username = document.getElementById("username-id");
let signup_password = document.getElementById("password-id");


signup_btn.addEventListener("click", () => {

    let err_msg = document.getElementById("err-msg");

    if(signup_username.value.length <= 4) {

        err_msg.innerText = "username must be greater than 4";

    } else if (signup_password.value <= 3) {

        err_msg.innerText = "password must be greater than 3";

    } else {
        localStorage.setItem("username", signup_username.value);
        localStorage.setItem("password", signup_password.value);

        window.location.href = "../index.html"
    }

})