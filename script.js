const pokemonSearchForm = document.querySelector(".pokemon-search-form")
const displayPokemonView = document.querySelector(".pokemon-view")
const gallery = document.querySelector(".gallery")
const selectedPokemonImage = document.querySelector(".selected-pokemon-image")
const selectedPokemonName = document.querySelector(".selected-pokemon-name")
const selectedPokemonWeight = document.querySelector(".selected-pokemon-weight")
const selectedPokemonHeight = document.querySelector(".selected-pokemon-height")
const powerLed = document.querySelector(".power-led")


async function callPokemonAPI(pokemonNameOrId) {
    try {
        const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`)
        if (!APIResponse.ok) {
            throw new Error ('La requête a échoué avec le code ' + APIResponse.status);
        }
        const data = await APIResponse.json()
        return data
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}

function displayPokemonInGrid() {
    for (let i = 1; i < 300; i++) {
        const figureElement = document.createElement("figure")
        const pokemonImage = document.createElement("img")
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
        figureElement.setAttribute("data-pokemon-id", i)
        figureElement.appendChild(pokemonImage)
        figureElement.classList.add("figure-element")
        gallery.appendChild(figureElement)
    }
}

function swithPowerLedColorAndPlaySong(powerLed) {
    powerLed.classList.remove("power-led-off")
    powerLed.classList.add("power-led-on")
    let audio = new Audio("/asset/mp3/game-boy-song.mp3")
    audio.play();
}

function playSwithSong() {
    let audio = new Audio("/asset/mp3/swing-song.mp3")
    audio.play();
}

function addEventListenerOnFigure(figure,figureElementsArray) {
    figure.addEventListener("click", async (event) =>{
        event.stopPropagation()
        figureElementsArray.forEach((figure2) => figure2.classList.remove("selected"))
        figure.classList.add("selected")
        const pokemonData = await callPokemonAPI(figure.dataset.pokemonId)
        if (document.querySelector(".power-led.power-led-off")) {
            swithPowerLedColorAndPlaySong(powerLed)
        }else{
            playSwithSong()
        }
        selectedPokemonImage.src = figure.querySelector("img").src
        selectedPokemonName.textContent = pokemonData.name
        selectedPokemonHeight.textContent = pokemonData.height
        selectedPokemonWeight.textContent = pokemonData.weight
    })
}

    function loop() {
    displayPokemonInGrid()
    const figureElements = document.querySelectorAll("figure")
    const figureElementsArray = Array.from(figureElements)
    figureElementsArray.forEach((figure) => addEventListenerOnFigure(figure,figureElementsArray))
}


loop()
