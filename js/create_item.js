const titleInput = document.getElementById("formGroupExampleInput");
const descriptionInput = document.getElementById("descriptionInput");
const priceInput = document.getElementById("priceInput");
const confirmButton = document.getElementById("confirm_button")

var id = Math.random().toString(16).slice(2);


const getInputValues = () => {
    return {
        id: id,
        name: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value
    };
};

const clearInputs = () => {
    titleInput.value = "";

    descriptionInput.value = "";

    priceInput.value = "";

};

confirmButton.addEventListener('click' , () =>  {
    console.log(titleInput)
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
        const perfumes = JSON.parse(localStorage.getItem('perfumes'))
        perfumes.push(getInputValues())
        localStorage.setItem('perfumes', JSON.stringify(perfumes))
    }
    clearInputs()
})

