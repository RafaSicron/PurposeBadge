const form = document.querySelector("form")
const firstNameInput =form.querySelector('input[placeholder="Primeiro nome"]')
const lastnameInput = form.querySelector('input[placeholder="Sobrenome"]')
const professionInput =form.querySelector('input[placeholder="Profissão"]')
const emailInput = form.querySelector('input[placeholder="Email"]')
const passwordInput = form.querySelector('input[placeholder="Senha"]')
const termsCheckbox = document.getElementById("terms-checkbox");



form.addEventListener("submit", (e) => {
    e.preventDefault()

    const userData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastnameInput.value.trim(),
        profession: professionInput.value.trim(),
        email: emailInput.value.trim(),
        senha: passwordInput.value.trim()
    }

    if(Object.values(userData).some(value => value === '') || !termsCheckbox.checked) {
    alert("Por favor, preencha todos os campos!")
    return
    }


    sessionStorage.setItem("userData", JSON.stringify(userData))
    sessionStorage.setItem("isLoggedIn", "true")

    window.location.href = "../../index.html"
})