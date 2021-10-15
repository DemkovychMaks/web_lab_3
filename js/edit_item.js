const titleInput = document.getElementById("formGroupExampleInput");
const descriptionInput = document.getElementById("descriptionInput");
const priceInput = document.getElementById("priceInput");
const editButton = document.getElementById("edit_button")

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const perfumes = JSON.parse(localStorage.getItem('perfumes'))

const perfum = perfumes.find( (p) => {
    return p.id == myParam
    }
)
console.log(perfum)

titleInput.value = perfum.name
descriptionInput.value = perfum.description
priceInput.value = perfum.price


const getInputValues = () => {
    return {
        name: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value
    };
};

editButton.addEventListener('click' , () =>  {
    const invalidSymbols = ["@", "#", "<", ">", "/", "\\", "*", "+", "-", "=", ")", "(", "[", "]",
        "{", "}", "&", "^", "%", "$","!", "~"];

    if(titleInput.value == 0){
        window.alert("The title is empty");
    }
    else if(invalidSymbols.some(symbol =>titleInput.value.includes(symbol))){
        window.alert("Invalid symbols in the title");
    }
    else if(descriptionInput.value == 0){
        window.alert("The description is empty");
    }
    else if(priceInput.value == 0){
        window.alert("The input of price is empty");
    }
    else {
        const updatedPerfumes = perfumes.map((p) => {
            if(p.id == myParam) {
                return {...p, ...getInputValues()}
            }
            return p
        })
        localStorage.setItem('perfumes', JSON.stringify(updatedPerfumes))
    }
})