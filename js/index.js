import { PERFUMES } from './perfumes.js';

const searchButton = document.getElementById("search_btn");
const clearButton = document.getElementById("clear_btn");
const searchInput = document.getElementById("header__text__area");
const sortCheckbox = document.getElementById("flexSwitchCheckDefault");
const countButton = document.getElementById("count_btn");
const cardsContainer = document.getElementById("cards_container");
const totalPriceContainer = document.getElementById("total_price");

let perfumes = PERFUMES;

const savedPerfumes = localStorage.getItem('perfumes');
if (savedPerfumes) {
    perfumes = JSON.parse(savedPerfumes)
}
else {
    localStorage.setItem('perfumes', JSON.stringify(perfumes))
}


function cardTemplate({id, image, name, description, price}){
    return `
        <div class="col-4 col-sm-12 col-md-4">
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p>Price ${price}</p>
                    <button type="button" class="btn btn-outline-primary">
                        <a href="edit_item.html?id=${id}">Edit</a>
                    </button>
                    <button type="button" class="btn btn-outline-danger">Remove</button>
                </div> 
            </div>
        </div>
    `;
}


function addCardToPage ({ id, image, name, description, price }) {
    cardsContainer.insertAdjacentHTML(
        "afterbegin",
        cardTemplate({ id, image, name, description, price })
    );
}

function renderCardsList (cards) {
    cardsContainer.innerHTML = "";
    for (const card of cards) {
        addCardToPage(card);
    }
}

function defaultPerfumesSort () {
    perfumes.sort((card1,card2) =>card2.name.localeCompare(card1.name));
    return perfumes
}


countButton.addEventListener('click', () => {
    const total = perfumes.reduce((acc, item) => acc + parseInt(item.price), 0);
    totalPriceContainer.innerHTML = total;
});

searchButton.addEventListener('click', () => {
    const search = searchInput.value.toLowerCase();
    perfumes = JSON.parse(localStorage.getItem('perfumes'));
    const filteredPerfumes = perfumes.filter((perfume) => perfume.name.toLowerCase().includes(search));
    // localStorage.setItem('perfumes', JSON.stringify(filteredPerfumes));
    renderCardsList(filteredPerfumes);
    perfumes = filteredPerfumes;
})

clearButton.addEventListener("click", () => {
    // localStorage.setItem('perfumes', JSON.stringify(PERFUMES));
    renderCardsList(JSON.parse(localStorage.getItem('perfumes')));
    searchInput.value = "";
    perfumes = JSON.parse(localStorage.getItem('perfumes'));;
});


sortCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        const copy = [...perfumes]
        copy.sort((a, b) => a.price - b.price);
        renderCardsList(copy);
    } else {
        renderCardsList(perfumes);
    }
});

renderCardsList(defaultPerfumesSort());
