// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      'name' in pokemon
    ){
      pokemonList.push(pokemon);
      console.log("Object.keys requirement passed.")
    }else{
      console.log("Error: Please follow template to add Pokemon.")
    }
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    list.appendChild(listPokemon);
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

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
    })
  }

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

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (){
      console.log(pokemon);
    });
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

// loads pokemon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
