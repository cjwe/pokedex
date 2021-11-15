// start IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Adds pokemon to array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Error invalid pokemon added.")
    }
  }

  // Displays loading message while loading in Pokémon data.
  let loaderDiv = document.querySelector('.loader');

    const showLoadingMessage = () =>{
        loaderDiv.classList.add('show')
    }

    const hideLoadingMessage = () =>{
        setTimeout(()=>{
            loaderDiv.classList.remove('show');
        }, 1000);
    }

  // Fetches Pokémon from API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  // Loads selected Pokémon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Displays details from loadDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Adds Pokémon buttons to pokemon-list class
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');

    // Creates Pokémon button
    let button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    listPokemon.classList.add('group-list-item');
    button.classList.add('btn');
    button.innerText = pokemon.name;

    listPokemon.appendChild(button);
    list.appendChild(listPokemon);

    loadDetails(pokemon).then(function () {
      let typeName = pokemon.types[0].type.name;
      let typeContainer = document.createElement('div');
      typeContainer.classList.add('spriteHolder');
      button.appendChild(typeContainer);

      let imgContainer = document.createElement('div');
      let typeBackground = document.createElement('div');
      imgContainer.classList.add('img-wrap', typeName);
      typeBackground.classList.add(typeName);
      button.appendChild(imgContainer);
      let imgElement = document.createElement('img');
      imgElement.src = pokemon.imageUrl;
      imgContainer.appendChild(imgElement);
    });

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // Creates Pokemon modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-body");
    let modalBody = document.querySelector(".modal-body");
    let modalHeader = $(".modal-header");

    //Clears existing modal content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // Title and name div
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');
    // Title element for modalBody
    let titleElement = document.createElement('h2');
    titleElement.innerHTML = pokemon.name;
    titleDiv.append(titleElement);
    // Image element for modal
    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    titleDiv.append(imgElement);
    modalBody.append(titleDiv);

    // Info div 
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');

    // Height element for modal
    let heightElement = document.createElement('p');
    heightElement.innerHTML = ('Height: ') + pokemon.height + ' m';
    infoDiv.append(heightElement);

    // Type element for modal
    // Map of pokemon types
    let mapPokemonTypes = pokemon.types;
    let map = mapPokemonTypes.map(function (pokemon) {
      return pokemon.type.name;
    });

    let typeElement = document.createElement('p');
    infoDiv.append(typeElement);
    let typeSpanElement1 = document.createElement('span');
    let typeSpanElement2 = document.createElement('span');

    // Type element forEach loop
    pokemon.types.forEach(item => {
      if (pokemon.types.length === 1) {
        typeElement.innerText = ('Type: ');
        typeSpanElement1.classList.add(map);
        typeSpanElement1.innerText = map;
        infoDiv.appendChild(typeSpanElement1);
      } else {
        typeElement.innerText = ('Types: ');
        typeSpanElement1.classList.add(map[0]);
        typeSpanElement1.innerText = map[0];
        typeSpanElement2.classList.add(map[1]);
        typeSpanElement2.innerText = map[1];
        infoDiv.appendChild(typeSpanElement1);
        infoDiv.appendChild(typeSpanElement2);
      }
      modalBody.append(infoDiv);
    });

  }
  // end modal element

  // search function 
  let filter = document.querySelector('#searchBar');
  let noResults = document.createElement('h3');
    noResults.innerText = 'No Pokémon found.';

  filter.addEventListener('input', () => {

    let list = document.querySelector('.pokemon-list');

    let value = filter.value.toLowerCase();
    listItems = list.getElementsByTagName('li');
    let isPokemonFound = false; // Help to control the no result message 

    for (let i = 0;  i < listItems.length; i++) {
      let button = listItems[i].getElementsByTagName('button')[0];
      let pokemon = button.textContent || button.innerText;

      if (pokemon.toLowerCase().indexOf(value) > -1) {
        listItems[i].style.display = "";
        isPokemonFound = true;
      } else {
        listItems[i].style.display = "none";
      }
    }

    if (!isPokemonFound) {
      list.appendChild(noResults);
    }

    if (list.contains(noResults) && isPokemonFound) {
      list.removeChild(noResults)
    }
  });

  // Type color 

  function findType(pokemon) {
    pokemon.types.forEach(pokemon => {
      if (pokemon.types.length === 1) {
        return map;
      } else {
        return pokemon.type.name[0], [1];
      }
    });

  }

  // returns list of pokemon
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
// end IIFE

// loads pokemon buttons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});