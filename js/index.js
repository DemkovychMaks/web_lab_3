const PARFUMES = [
    {id:1, image: "https://www.brocard.ua/media/catalog/product/cache/18f267265017fbb2a7bb09cdec08aa8e/image/149819d6f4/lacoste-eau-de-lacoste-l-12-12-blanc-pure.jpg", name:'Lacoste', description:'No detail ', price:80 },
    {id:2, image: "https://www.brocard.ua/media/catalog/product/cache/18f267265017fbb2a7bb09cdec08aa8e/image/1359155a67/giorgio-armani-acqua-di-gio.jpg", name:'Giorgio Armani', description:'No detail ', price:120 },
    {id:3, image: "https://www.brocard.ua/media/catalog/product/cache/18f267265017fbb2a7bb09cdec08aa8e/image/150978dd59/dolce-gabbana-light-blue.jpg", name:'Dolce Gabbana', description:'No detail ', price:300 },
    {id:4, image: "https://www.letu.ua/common/img/uploaded/skuImageFolder/3145891262605GR.jpg", name:'Chanel', description:'No detail ', price:160 },
    {id:5, image: "https://static.zara.net/photos///2021/V/2/2/p/0220/070/999/2/w/750/0220070999_1_1_1.jpg?ts=1610529558642", name:'Zara', description:'No detail ', price:50 },
    {id:6, image: "https://boheme.com.ua/images/thumb9542416800_1_1_3.jpg", name:'Bershka', description:'No detail ', price:70 },
    {id:7, image: "https://cdn.notinoimg.com/detail_thumb_2k/victorias-secret/0667524664424_01-o/victorias-secret-bombshell___18.jpg", name:'Victoria Secret', description:'No detail ', price:80 },
];

const searchButton = document.getElementById("search_btn");
const clearButton = document.getElementById("clear_btn");
const searchInput = document.getElementById("header__text__area");
const sortCheckbox = document.getElementById("flexSwitchCheckDefault");
const countButton = document.getElementById("count_btn");
const cardsContainer = document.getElementById("cards_container");
const totalPriseContainer = document.getElementById("total_price");

let parfumes = PARFUMES;

function cardTemplate({id, image, name, description, price}){
    return `
        <div class="col-4 col-sm-12 col-md-4">
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p>Prise ${price}</p>
                    <button type="button" class="btn btn-outline-primary">
                        <a href="edit_item.html">Edit</a>
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

function renderCardsList(cards) {
    cardsContainer.innerHTML = "";
    for (const card of cards) {
        addCardToPage(card);
    }
}

function refetchallVases () {
    const allParfumes = PARFUMES;
    parfumes = allParfumes.sort((card1,card2) =>card2.name.localeCompare(card1.name));
    renderCardsList(parfumes);
}


countButton.addEventListener('click', () => {
    const total = parfumes.reduce((acc, item) => acc + item.price, 0);
    totalPriseContainer.innerHTML = total;
});

searchButton.addEventListener('click', () => {
    const search = searchInput.value.toLowerCase();
    parfumes = PARFUMES;
    const filteredPerfumes = parfumes.filter((perfume) => perfume.name.toLowerCase().includes(search));
    renderCardsList(filteredPerfumes);
    parfumes = filteredPerfumes;
})

clearButton.addEventListener("click", () => {
    renderCardsList(PARFUMES);
    searchInput.value = "";
});


sortCheckbox.addEventListener("change", function (e) {
    if (this.checked) {
        const sortedParfumes = parfumes.sort(
            (card1, card2) => parseInt(card1.price) - parseInt(card2.price));
        renderCardsList(sortedParfumes);
    }
    else {
        refetchallVases();
    }
});

refetchallVases();