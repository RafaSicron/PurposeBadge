
const navContainer = document.querySelector(".navigatorContainer");
const cardsContainer = document.querySelector(".cards");


function renderUserProfile() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData) {
        navContainer.innerHTML = `
            <a href="./assets/html/badgePage.html" id="badgeLink">Adiquirir os selos</a>
            <div class="user-profile">
                <img src="./assets/imgs/profileIcon.png" alt="Perfil" id="profileIcon">
                <div class="profile-dropdown" id="profileDropdown">
                    <p><strong>${userData.firstName} ${userData.lastName}</strong></p>
                    <p>Profissão: ${userData.profession}</p>
                    <p>Selos: ${userData.email}</p>
                    <button id="logoutBtn">Sair</button>
                </div>
            </div>
        `;

        const profileIcon = document.getElementById("profileIcon");
        const profileDropdown = document.getElementById("profileDropdown");
        const logoutBtn = document.getElementById("logoutBtn");
        const badgeLink = document.getElementById("badgeLink");

        profileDropdown.style.display = "none";

        profileIcon.addEventListener("click", () => {
            profileDropdown.style.display = profileDropdown.style.display === "none" ? "block" : "none";
        });

        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("userData");
            window.location.reload();
        });

     
        badgeLink.addEventListener("click", (e) => {
            if (!userData) {
                e.preventDefault();
                alert("Você precisa estar logado para acessar a página de selos!");
            }
        });
    }
}


const seeMoreModal = document.getElementById("seeMoreModal");
const closeSeeMoreModal = document.getElementById("closeSeeMoreModal");
const seeMoreModalTitle = document.getElementById("seeMoreModalTittle");
const seeMoreModalDescription = document.getElementById("seeMoreModalDescription");

cardsContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".selo-button, .ver-mais");
    if (!target) return;

    const userData = JSON.parse(sessionStorage.getItem("userData"));

   
    if (target.classList.contains("selo-button")) {
        if (!userData) {
            alert("Você precisa estar logado para se candidatar!");
            return;
        }

        const card = target.closest(".selo");
        const projeto = {
            title: card.querySelector(".selo-header h2").innerText,
            description: card.querySelector(".selo-text p").innerText,
            image: card.querySelector("img").src
        };

        let projetos = JSON.parse(sessionStorage.getItem("projetosCandidatos")) || [];
        projetos.push(projeto);
        sessionStorage.setItem("projetosCandidatos", JSON.stringify(projetos));

        alert("Projeto cadastrado com sucesso!");
    }

  
    if (target.classList.contains("ver-mais")) {
        seeMoreModalTitle.textContent = target.dataset.title;
        seeMoreModalDescription.textContent = target.dataset.description;
        seeMoreModal.style.display = "flex";
    }
});

closeSeeMoreModal.addEventListener("click", () => {
    seeMoreModal.style.display = "none";
});

const newProjectButton = document.getElementById("newProjectButton");
const newProjectModal = document.getElementById("newProjectModal");
const closeNewProjectModal = document.getElementById("closeNewProjectModal");

const saveProjectBtn = document.getElementById("saveProjectBtn");

const newProjectTitle = document.getElementById("newProjectTitle");
const newProjectSubtitle = document.getElementById("newProjectSubtitle");
const newProjectSpots = document.getElementById("newProjectSpots");
const newProjectDescription = document.getElementById("newProjectDescription");

newProjectButton.addEventListener("click", () => {
    newProjectModal.style.display = "flex";
});

closeNewProjectModal.addEventListener("click", () => {
    newProjectModal.style.display = "none";
});

saveProjectBtn.addEventListener("click", () => {
    const title = newProjectTitle.value.trim();
    const subtitle = newProjectSubtitle.value.trim();
    const spots = newProjectSpots.value.trim();
    const description = newProjectDescription.value.trim();

    if (!title || !subtitle || !spots || !description) {
        alert("Preencha todos os campos!");
        return;
    }

    const article = document.createElement("article");
    article.classList.add("selo");

    article.innerHTML = `
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80" alt="Imagem do projeto">
        <div class="selo-content">
            <div class="selo-header">
                <h2>${title}</h2>
                <button class="selo-tag ver-mais"
                    data-title="${title}"
                    data-description="${description}">
                    Ver mais
                </button>
            </div>

            <div class="selo-text">   
                <p>${subtitle}</p>
                <span>vagas - ${spots}</span>
            </div>

            <button class="selo-button" type="button">
                <img src="./assets/imgs/applyIcon.png" alt="icone de aplicar">
                Se candidatar
            </button>
        </div>
    `;

    cardsContainer.appendChild(article);

    // Limpa campos
    newProjectTitle.value = "";
    newProjectSubtitle.value = "";
    newProjectSpots.value = "";
    newProjectDescription.value = "";

    newProjectModal.style.display = "none";
});

renderUserProfile();
