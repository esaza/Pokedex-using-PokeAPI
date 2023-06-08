const pokemonContainer = document.querySelector('.pokemon-container');
let footer = document.getElementById('footer');
let page = 1;

// Ventanas
var smallWindow = window.matchMedia("(max-width: 800px)")
var medWindow = window.matchMedia("(max-width: 1020px)")

// Botones
let previousButton = document.querySelector('.previous-button');
let nextButton = document.querySelector('.next-button');
let startButton = document.querySelector('.start-button');
let endButton = document.querySelector('.end-button');

// Le doy por defecto display 'none' para que no se vean hasta que el usuario escoga una opción
nextButton.style.display = 'none';
previousButton.style.display = 'none';
startButton.style.display = 'none';
endButton.style.display = 'none';

let maxPokes = 0;

// Se usarán como límite de los pokémones que se mostraran 
let limit = 29;
let offset = 1;

// Array donde se guardarán los pokémones y los buscados
let pokemons = [];
let pokemonsSearched = ['none'];

/**
 * Función que buscará el pokemon a traves de un ID en la pokeapi
 * @param {number} pokemonID 
 */
function pokemonSearcherByID(pokemonID) {

    // La función fetch() en JavaScript se utiliza para realizar solicitudes HTTP desde el navegador web al servidor.
    // El método then() és para procesar la respuesta HTTP que se recibe de la URL
    // El método json() és para convertir la respuesta en un objeto JSON
    // En este caso cogeremos la respuesta que nos de la API y la convertiremos a JSON
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonID + '/')

        // Convertimos cada pokémon que encuentre en un JSON
        .then(pokemonJSON => pokemonJSON.json())
        .then((pokemon) => {

            // Agregamos el pokémon a las matrices
            pokemons.push(pokemon);

            // Si el número de pokémones es igual que el de el máximo mostrará el pokémon
            if (pokemons.length == maxPokes) {
                showPokemon();
            }
            // console.log(pokemon);
        });
}

/**
 * Función que buscará el pokemon a traves de un nombre en la pokeapi
 * @param {number} pokemonID 
 */
function pokemonSearcherByName(pokemonName) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName + '/')
        .then(pokemonJSON => pokemonJSON.json())
        .then((pokemon) => {
            pokemons.push(pokemon);
            showPokemon();
        });
}

/**
 * Función que dado un número mostrará los pokémons
 * @param {number} number 
 */
function pokemonsSearcher(offset, limit) {

    // Volvemos a iniciar el array y el máximo de pokemones antes de realizar otra busqueda, para que
    // no te salgan los pokémones de antes
    pokemons = [];
    maxPokes = 0;
    for (let i = offset; i <= offset + limit; i++) {
        // Le pasamos el buscador que habiamos creado antes
        pokemonSearcherByID(i);
        maxPokes++;
    }

}

/**
 * Función que dado un pokemon lo muestra en la pokédex
 */
function showPokemon() {
    // Ordenar los pokémons por su número de ID
    pokemons.sort((pokemon1, pokemon2) => pokemon1.id - pokemon2.id);

    // Mostramos los pokémon que encuentra dentro del array de pokémones
    // Hará una caja para cada pokémon que encuentre
    pokemons.forEach(poke => {

        // Caja de cada pokémon
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon-block');
        pokemonDiv.id = poke.types[0].type.name;

        // Cambiamos el color de la caja del pokémon dependiendo de su tipo
        switch (pokemonDiv.id) {
            case 'fire':
                pokemonDiv.style.backgroundColor = 'rgba(249,165,85,255)';
                break;
            case 'grass':
                pokemonDiv.style.backgroundColor = 'rgba(99,188,93,255)';
                break;
            case 'water':
                pokemonDiv.style.backgroundColor = 'rgba(87,158,221,255)';
                break;
            case 'bug':
                pokemonDiv.style.backgroundColor = 'rgba(147,187,58,255)';
                break;
            case 'normal':
                pokemonDiv.style.backgroundColor = 'rgba(160,162,159,255)';
                break;
            case 'poison':
                pokemonDiv.style.backgroundColor = 'rgba(182,103,205,255)';
                break;
            case 'ground':
                pokemonDiv.style.backgroundColor = 'rgba(216,124,82,255)';
                break;
            case 'electric':
                pokemonDiv.style.backgroundColor = 'rgba(241,216,90,255)';
                break;
            case 'psychic':
                pokemonDiv.style.backgroundColor = 'rgba(248,134,132,255)';
                break;
            case 'rock':
                pokemonDiv.style.backgroundColor = 'rgba(201,187,141,255)';
                break;
            case 'fairy':
                pokemonDiv.style.backgroundColor = 'rgba(237,147,228,255)';
                break;
            case 'fighting':
                pokemonDiv.style.backgroundColor = 'rgba(209,68,97,255)';
                break;
            case 'ghost':
                pokemonDiv.style.backgroundColor = 'rgba(96,111,186,255)';
                break;
            case 'ice':
                pokemonDiv.style.backgroundColor = 'rgba(121,208,193,255)';
                break;
            case 'dragon':
                pokemonDiv.style.backgroundColor = 'rgba(23,108,197,255)';
                break;
            case 'steel':
                pokemonDiv.style.backgroundColor = 'rgba(89,149,162,255)';
                break;
            case 'dark':
                pokemonDiv.style.backgroundColor = 'rgba(89,87,97,255)';
                break;
            case 'flying':
                pokemonDiv.style.backgroundColor = 'rgba(162,188,234,255)';
                break;
        };

        // Contenedor del sprite del pokémon
        const spriteContainer = document.createElement('div');
        spriteContainer.classList.add('img-container');

        // Cambiamos el fondo del pokémon dependiendo de su tipo
        switch (pokemonDiv.id) {
            case 'fire':
                spriteContainer.style.backgroundImage = 'url(img/fireBackground.png)';
                break;
            case 'grass':
                spriteContainer.style.backgroundImage = 'url(img/grassBackground.png)';
                break;
            case 'water':
                spriteContainer.style.backgroundImage = 'url(img/waterBackground.png)';
                break;
            case 'bug':
                spriteContainer.style.backgroundImage = 'url(img/bugBackground.png)';
                break;
            case 'normal':
                spriteContainer.style.backgroundImage = 'url(img/normalBackground.png)';
                break;
            case 'poison':
                spriteContainer.style.backgroundImage = 'url(img/poisonBackground.png)';
                break;
            case 'ground':
                spriteContainer.style.backgroundImage = 'url(img/groundBackground.png)';
                break;
            case 'electric':
                spriteContainer.style.backgroundImage = 'url(img/electricBackground.png)';
                break;
            case 'psychic':
                spriteContainer.style.backgroundImage = 'url(img/psychicBackground.png)';
                break;
            case 'rock':
                spriteContainer.style.backgroundImage = 'url(img/rockBackground.png)';
                break;
            case 'fairy':
                spriteContainer.style.backgroundImage = 'url(img/fairyBackground.png)';
                break;
            case 'fighting':
                spriteContainer.style.backgroundImage = 'url(img/fightingBackground.png)';
                break;
            case 'ghost':
                spriteContainer.style.backgroundImage = 'url(img/ghostBackground.png)';
                break;
            case 'ice':
                spriteContainer.style.backgroundImage = 'url(img/iceBackground.png)';
                break;
            case 'dragon':
                spriteContainer.style.backgroundImage = 'url(img/dragonBackground.png)';
                break;
            case 'steel':
                spriteContainer.style.backgroundImage = 'url(img/steelBackground.png)';
                break;
            case 'dark':
                spriteContainer.style.backgroundImage = 'url(img/darkBackground.png)';
                break;
            case 'flying':
                spriteContainer.style.backgroundImage = 'url(img/flyingBackground.png)';
                break;
        };

        // Boton shiny
        const shinyButton = document.createElement('button');
        shinyButton.textContent = '✨';
        shinyButton.name = poke.id;
        shinyButton.classList.add('shinyBtn');

        // Hacemos que al clickar muestre la versión shiny de un pokémon
        shinyButton.onclick = function () {
            if (shinyButton.name == 'shiny') {
                sprite.src = poke.sprites.front_default;
                shinyButton.name = poke.id;
                shinyButton.style.backgroundColor = 'transparent';
                shinyButton.style.borderRadius = '10px';
            } else {
                sprite.src = poke.sprites.front_shiny;
                shinyButton.name = 'shiny';
                shinyButton.style.backgroundColor = 'rgba(0, 0, 0, 0.367)';
                shinyButton.style.borderRadius = '10px';
            }
        };

        // Mostramos los tipos de cada pokémon
        const types = document.createElement('div');
        types.classList.add('box-types');
        types.innerHTML += 'Type/s: <br>';

        // Con la función map cogeremos todo lo de adentro del array types para guardarlo en otro
        const arrayTypes = poke.types.map((type) => type.type.name);
        for (let i = 0; i < arrayTypes.length; i++) {
            types.innerHTML += arrayTypes[i];
            if (i < arrayTypes.length - 1) {
                types.innerHTML += '/';
            }
        }


        // Mostramos las habilidades de cada pokémon
        const abilities = document.createElement('div');
        abilities.classList.add('box-abilities');
        abilities.innerHTML += 'Abilitie/s: <br>';
        const arrayAbilities = poke.abilities.map((ability) => ability.ability.name);
        for (let i = 0; i < arrayAbilities.length; i++) {
            abilities.innerHTML += arrayAbilities[i];
            if (i < arrayAbilities.length - 1) {
                abilities.innerHTML += '/';
            }
        }

        // Sprite del pokémon
        const sprite = document.createElement('img');
        sprite.src = poke.sprites.front_default;
        sprite.style.width = '100%';
        spriteContainer.appendChild(sprite);

        // Número de la pokedex
        const number = document.createElement('p');

        // padStart és para que muestre los string con formato "000"
        number.textContent = '#' + poke.id.toString().padStart(4, 0);
        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = poke.name;

        pokemonDiv.appendChild(spriteContainer);
        pokemonDiv.appendChild(number);
        pokemonDiv.appendChild(name);
        pokemonDiv.appendChild(types);
        pokemonDiv.appendChild(abilities);
        pokemonDiv.appendChild(shinyButton);

        pokemonContainer.appendChild(pokemonDiv);
    });
}

/**
 * Función que recibirá el ID de una generación y mostrará sus pokémones
 * @param {generationID} generation Será el número de cada generación
 */
function changeGeneration(generation) {
    const generationID = generation.value;
    // Todas las generaciones
    if (generationID == 'all') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(1, 991, 29, 19, 34);
        console.log('all');

        // Primera generación
    } else if (generationID == '1') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(1, 151, 29, 0, 5);
        console.log('1 Generation');

        // Segunda generación
    } else if (generationID == '2') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(152, 242, 29, 9, 4);
        console.log('2 Generation');

        // Tercera generación
    } else if (generationID == '3') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(252, 372, 29, 14, 5);
        console.log('3 Generation');

        // Cuarta generación
    } else if (generationID == '4') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(387, 477, 29, 16, 4);
        console.log('4 Generation');

        // Quinta generación
    } else if (generationID == '5') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(494, 644, 29, 5, 6);
        console.log('5 Generation');

        // Sexta generación
    } else if (generationID == '6') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(650, 710, 29, 11, 3);
        console.log('6 Generation');

        // Septima generación
    } else if (generationID == '7') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(722, 782, 29, 25, 3);
        console.log('7 Generation');

        // Octava generación
    } else if (generationID == '8') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(810, 870, 29, 28, 3);
        console.log('8 Generation');

        // Leyendas Arceus 
    } else if (generationID == 'arceus') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(899, 899, 6, 6, 1);
        console.log('Leyends Arceus');
    } else if (generationID == '9') {
        showFooterAndRedirectToPage1();
        showGenerationPokemons(906, 996, 29, 14, 4);
        console.log('9 Generation');
    }
}

/**
 * Función para mostrar los botones y 
 * ponerlos abajo del todo junto  al footer.
 */
function showFooterAndRedirectToPage1() {

    // Al entrar a una generación no podrás buscar pokémones sin vaciar la pokedex
    document.getElementById('emptyPokedex').disabled = false;
    document.getElementById('pokemonName').disabled = true;
    document.getElementById('searchPokemonInput').disabled = true;

    // Al entra a una generación distinta volverás a la página 1
    location.href = '#1';
    page = 1;

    // Pondremos relative para que muestre el footer debajo de los últimos pokémones
    footer.style.position = 'relative';
    nextButton.style.display = 'inline-block';
    previousButton.style.display = 'inline-block';
    startButton.style.display = 'inline-block';
    endButton.style.display = 'inline-block';

}

/**
 * Función para mostrar solo los pokémones de cada generación
 * @param {pokemonID} firstPokemonID Aqui se pondrá el id del primer pokémon que quieres buscar
 * @param {pokemonID} lastPokemonID Aqui se pondrá el id del último pokémon que quieres buscar
 * @param {limit} firstLimit Se usará para que muestre un número de pokémones
 * @param {limit} lastLimit Se usará para que muestre un número de pokémones en la última página
 */
function showGenerationPokemons(firstPokemonID, lastPokemonID, firstLimit, lastLimit, lastPage) {
    pokemonContainer.innerHTML = "";
    limit = firstLimit;
    offset = firstPokemonID;


    // Acciones de los botones
    pokemonsSearcher(offset, limit);
    startButton.onclick = function () {
        page = 1;
        startButton.href = '#' + page;
        offset = firstPokemonID;
        pokemonContainer.innerHTML = "";
        pokemonsSearcher(firstPokemonID, 29);
    };
    endButton.onclick = function () {
        page = lastPage;
        endButton.href = '#' + page;
        offset = lastPokemonID;
        pokemonContainer.innerHTML = "";
        pokemonsSearcher(lastPokemonID, lastLimit);
    };
    previousButton.onclick = function () {
        limit = 29;
        if (offset != firstPokemonID) {
            page--;
            previousButton.href = '#' + page;
            offset -= 30;
            pokemonContainer.innerHTML = "";
            pokemonsSearcher(offset, limit);
        }
    };
    nextButton.onclick = function () {
        if (offset != lastPokemonID) {
            page++;
            nextButton.href = '#' + page;
            offset += 30;
            // console.log(offset);
            if (offset == lastPokemonID) {
                limit = lastLimit;

            } else {
                limit = 29;
            }
            pokemonContainer.innerHTML = "";
            pokemonsSearcher(offset, limit);
        }
    };
}

function searchPokemonInput() {

    nextButton.style.display = 'none';
    previousButton.style.display = 'none';
    startButton.style.display = 'none';
    endButton.style.display = 'none';
    pokemons = [];
    const pokemonInput = document.getElementById('pokemonName').value;
    for (let i = 0; i < pokemonsSearched.length; i++) {
        if (!pokemonsSearched.includes(pokemonInput)) {
            pokemonsSearched.push(pokemonInput);
            console.log(pokemonsSearched.length);
            pokemonSearcherByName(pokemonInput);

            // Dependiendo del tamaño de la ventana el footer tiene que estar siempre abajo
            if (smallWindow.matches) {
                if (pokemonsSearched.length > 5) {
                    footer.style.position = 'relative';
                }
            } else if (medWindow.matches) {
                if (pokemonsSearched.length > 6) {
                    footer.style.position = 'relative';
                }
            } else {
                if (pokemonsSearched.length > 7) {
                    footer.style.position = 'relative';
                }
            }
        }
    }

}

/**
 * Función que al vaciar la pokedex ya podrás volver a buscar pokémones
 */
function emptyPokedex() {
    document.getElementById('pokemonName').disabled = false;
    document.getElementById('searchPokemonInput').disabled = false;
    document.getElementById('emptyPokedex').disabled = true;
    pokemonContainer.innerHTML = "";
    footer.style.position = 'absolute';
}
