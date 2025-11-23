const loginButtom = document.getElementById("loginButtom");

const form = document.querySelector("form");
const emailInput = form.querySelector('input[placeholder="Email"]');
const passwordInput = form.querySelector('input[placeholder="Senha"]');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    if (!userData) {
        alert("Você ainda não possui uma conta!");
        return;
    }

    if (userData.email === email && userData.senha === senha) {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "../../index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});