const userData = JSON.parse(sessionStorage.getItem("userData"));
const navContainer = document.querySelector(".navigatorContainer");
const certificadosContainer = document.querySelector(".certificados");


if (!userData) {
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "../html/loginPage.html";
}


function renderUserProfile() {
    const updatedUser = JSON.parse(sessionStorage.getItem("userData"));

    if (updatedUser) {
        navContainer.innerHTML = `
            <a href="#">Adiquirir os selos</a>
            <div class="user-profile">
                <img src="../imgs/profileIcon.png" alt="Perfil" id="profileIcon">
                <div class="profile-dropdown" id="profileDropdown">
                    <p><strong>${updatedUser.firstName} ${updatedUser.lastName}</strong></p>
                    <p>Profissão: ${updatedUser.profession}</p>
                    <p>Selos: ${updatedUser.badges || 0}</p>
                    <button id="logoutBtn">Sair</button>
                </div>
            </div>
        `;

        const profileIcon = document.getElementById("profileIcon");
        const profileDropdown = document.getElementById("profileDropdown");
        const logoutBtn = document.getElementById("logoutBtn");

        profileDropdown.style.display = "none";

        profileIcon.addEventListener("click", () => {
            profileDropdown.style.display =
                profileDropdown.style.display === "none" ? "block" : "none";
        });

        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("userData");
            window.location.reload();
        });
    }
}


function renderUserProjects() {
    if (userData) {
        const projetos = JSON.parse(sessionStorage.getItem("projetosCandidatos")) || [];
        certificadosContainer.innerHTML = ""; // limpa os cards de exemplo

        if (projetos.length === 0) {
            certificadosContainer.innerHTML = "<p>Nenhum projeto cadastrado ainda.</p>";
        } else {
            projetos.forEach(p => {
                const card = document.createElement("article");
                card.classList.add("selo");
                card.innerHTML = `
                    <img src="${p.image}" alt="${p.title}">
                    <div class="selo-content">
                        <div class="selo-header">
                            <h2>${p.title}</h2>
                            <img src="../imgs/badge.png" alt="imagem do selo">
                        </div>
                        <p>${p.description}</p>
                        <button class="selo-button">Adquirir selo</button>
                    </div>
                `;
                certificadosContainer.appendChild(card);
            });

            ativarAquisicaoDeSelos();
        }
    }
}


function ativarAquisicaoDeSelos() {
    const botoes = document.querySelectorAll(".selo-button");

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            let dados = JSON.parse(sessionStorage.getItem("userData"));

            dados.badges = (dados.badges || 0) + 1;

            sessionStorage.setItem("userData", JSON.stringify(dados));

            alert("Selo adquirido!");

            renderUserProfile(); 
        });
    });
}


renderUserProfile();
renderUserProjects();
