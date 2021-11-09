// start IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Adds pokemon to array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      'name' in pokemon
    ){
      pokemonList.push(pokemon);
    }else{
      console.log("Error invalid pokemon added.")
    }
  }

  // Fetches pokemon from API
  function loadList() {
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
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Loads selected pokemon details from api
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
    loadDetails(pokemon).then(function (){
      showModal(pokemon);
    });
  }

  // Adds Pokemon buttons to pokemon-list class
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');

    listPokemon.classList.add('group-list-item');
    button.classList.add('btn');
    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    listPokemon.appendChild(button);
    list.appendChild(listPokemon);

    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  // Create Pokemon modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");
    let modalHeader = $(".modal-header");
    //Clear existing modal content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // Title element for modalBody
    let titleElement = document.createElement('h2');
    titleElement.innerHTML = pokemon.name;

    // Image element for modal
    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;

    // Height element for modal
    let heightElement = document.createElement('p');
    heightElement.innerHTML = ('Height: ') + pokemon.height;

    // Type element for modal
    let mapPokemonTypes = pokemon.types;
    // Map pokemon types
    let map = mapPokemonTypes.map(function(pokemon){
      return pokemon.type.name;
    });
    let typeElement = document.createElement('p');
    // Type element forEach loop
    pokemon.types.forEach(item => {
      if (pokemon.types.length === 1) {
        typeElement.innerText = ('Type: ') + map;
      }else{
        typeElement.innerText = ('Types: ') + map.join(', ');
      }
    });

    modalTitle.append(titleElement);
    modalBody.append(imgElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
  }
  // end modal element

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
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
