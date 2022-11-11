// Načtení data z localStorage do proměnné "names"; pokud je localStorage prázdný, tak do names se uloží prázdné pole

const names = getSavedNames()


// Odeslání formuláře a uložení do localStorage pomocí proměnné "names"
let myForm = document.querySelector("#form")
let myCheckbox = document.querySelector(".my-checkbox")

myForm.addEventListener("submit", function(event){
    // Vypnutí refrešování
    event.preventDefault()

    names.push({
        id: uuidv4(),
        firstName: event.target.elements.firstName.value,
        adult: myCheckbox.checked
    })

    // Vymazání jména když to odešlu
    event.target.elements.firstName.value = ""
    // Odškrtnutí když to odešlu
    myCheckbox.checked = false

    saveNames(names)
})



// Vypisování zpět do stránky
let buttonToList = document.querySelector(".to-list")

buttonToList.addEventListener("click", function(event){

    document.querySelector(".list-names").innerHTML = ""

    let namesFromStorage = localStorage.getItem("names")
    let namesFromStorageJSON = JSON.parse(namesFromStorage)

    namesFromStorageJSON.forEach(function(myName){
        const oneNameHTML = generateHTMLstructure(myName)
        document.querySelector(".list-names").appendChild(oneNameHTML)
    })
})


// Znovu načítání stránky
window.addEventListener("storage", function(){
    location.reload()
})

