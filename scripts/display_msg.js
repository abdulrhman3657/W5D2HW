let welcome_msg = document.getElementById("welcome");
let username1 = localStorage.getItem("username");

if (username1 != null){
    welcome_msg.innerText = `welcome back ${username1}`;
}

