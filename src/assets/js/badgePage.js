const userData = JSON.parse(sessionStorage.getItem("userData"));
const navContainer = document.querySelector(".navigatorContainer");
const certificadosContainer = document.querySelector(".certificados");

function isUserLoggedIn() {
    return sessionStorage.getItem("userData") && sessionStorage.getItem("isLoggedIn") === "true";
}

if (!isUserLoggedIn()) {
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "../html/loginPage.html";
}

function renderUserProfile() {
    const updatedUser = JSON.parse(sessionStorage.getItem("userData"));

    if (updatedUser && isUserLoggedIn()) {
        navContainer.innerHTML = `
            <a href="#">Adiquirir os selos</a>
            <div class="user-profile">
                <img src="../imgs/profileIcon.png" alt="Perfil" id="profileIcon">
                <div class="profile-dropdown" id="profileDropdown">
                    <p><strong>${updatedUser.firstName} ${updatedUser.lastName}</strong></p>
                    <p>Profissão: ${updatedUser.profession}</p>
                    <p>Email: ${userData.email}</p>
                    <p>Selos: ${userData.selos || 0}</p>
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
            sessionStorage.setItem("isLoggedIn", "false");
            window.location.reload();
        });
    }
}

function renderUserProjects() {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    if (user) {
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

            dados.selos = (dados.selos || 0) + 1;

            sessionStorage.setItem("userData", JSON.stringify(dados));

            alert("Selo adquirido!");

            window.location.reload();
        });
    });
}


renderUserProfile();
renderUserProjects();
