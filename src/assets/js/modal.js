const seeMoreModal = document.getElementById("seeMoreModal");
const closeSeeMoreModal = document.getElementById("closeSeeMoreModal");
const seeMoreModalTitle = document.getElementById("seeMoreModalTittle");
const seeMoreModalDescription = document.getElementById("seeMoreModalDescription");


document.querySelectorAll(".ver-mais").forEach(btn => {
    btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title");
        const description = btn.getAttribute("data-description");

        seeMoreModalTitle.textContent = title;
        seeMoreModalDescription.textContent = description;

        seeMoreModal.style.display = "flex";
    });
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


const cardsContainer = document.querySelector(".cards");



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



    const verMaisBtn = article.querySelector(".ver-mais");

    verMaisBtn.addEventListener("click", () => {
        seeMoreModalTitle.textContent = title;
        seeMoreModalDescription.textContent = description;
        seeMoreModal.style.display = "flex";
    });


 
    newProjectTitle.value = "";
    newProjectSubtitle.value = "";
    newProjectSpots.value = "";
    newProjectDescription.value = "";



    newProjectModal.style.display = "none";
});