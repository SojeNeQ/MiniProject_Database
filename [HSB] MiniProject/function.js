/* ************* Znovu použitelnej kód ************* */


/* 
    Funkce načítající data z localStorage;
    Ošetřit, pokud data v LocalStorage nejsou
*/

const  getSavedNames = function(){
    // Vytažení dat
    const myNames = localStorage.getItem("names")

    // myNames se nebude rovnat null
    if(myNames !== null){
        // Pokud to tam je tak to vrať skrz vrátnici (JSON)
        return  JSON.parse(myNames)
    } else {
        // Když se to rovná null tak mi vrať prázdné pole neboli jestli to tam není tak tam nic nevracej
        return []
    }
}





/* 
    Funkce pro použití při odeslání formuláře;
    Ukládá do localStorage jméno z formuláře
*/

const saveNames = function(oneName){
    // Převěď to přes vrátnici na string a ulož to do localStorage pod "names"
    localStorage.setItem("names", JSON.stringify(oneName))
}





/*
    Generování HTML struktury, kterou umístím do stránky po
    kliknutí na tlačítko "Vypiš"
    + použiju ji také pro vypsání nových informací z
    localStorage, když nějaké jméno vymažu pomocí tlačítka "Vymazat jméno"
*/

const generateHTMLstructure = function(oneName){
    const newDiv = document.createElement("div")
    const newLink = document.createElement("a")
    const button = document.createElement("button")

    // Nastavení mazacího tlačítka
    button.textContent = "Vymazat jméno"
    newDiv.appendChild(button)

    button.addEventListener("click", function(event){
        removeNames(names, oneName.id)
        saveNames(names)
        toListAgain()
    })

    newLink.textContent = oneName.firstName
    if(oneName.adult === true){
        newLink.classList.add("adult")
    } else {
        newLink.classList.add("no-adult")
    }

    newLink.setAttribute("href",`/edit.html#${oneName.id}`)

    newDiv.appendChild(newLink)

    return newDiv
}





/* 
    Podle ID najdu index daného jména a pomocí splice ho odstraním
*/

const removeNames = function(ourNames, id){
    const index = ourNames.findIndex(function(nameWantToCheck){
        return nameWantToCheck.id === id
    })

    if(index > -1){
        ourNames.splice(index, 1)
    }
}




/*
Pokud smažu nějaké jméno z localStorage, tak tato
funkce zabezpečí opětovné vypsání localStorage (tedy vypsání bez smazaného jména)
*/

const toListAgain = function(){
    document.querySelector(".list-names").innerHTML = ""

    let newData = getSavedNames()

    newData.forEach(function(onlyOneName){
        const newContent = generateHTMLstructure(onlyOneName)
        document.querySelector(".list-names").appendChild(newContent)
    })
}