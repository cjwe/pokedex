// start IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // start modal element
  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    // height element
    let contentHeightElement = document.createElement('p');
    contentHeightElement.innerText = ('Height: ') + pokemon.height;

    // type element
    let contentTypeElement = document.createElement('p');
    //map pokemon types
    let mapPokemonTypes = pokemon.types;
    let map = mapPokemonTypes.map(function(x){
      return x.type.name;
    })
    // forEach loop for types element
    pokemon.types.forEach(item => {
      if (pokemon.types.length === 1) {
       contentTypeElement.innerText = ('Type: ') + map;
     }else{
       contentTypeElement.innerText = ('Types: ') + map.join(', ');
     }
    })

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentTypeElement);
    modal.appendChild(contentHeightElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  // toggles visibility
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  // event listener to show modal
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  // event listenter to close with escape button
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  // event listenter to close with click
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  // end modal element

  // adds pokemon to array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      'name' in pokemon
    ){
      pokemonList.push(pokemon);
    }else{
      console.log("Error: Please follow template to add Pokemon.")
    }
  }

  // adds pokemon buttons to .pokemon-list class
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

  // fetches pokemon from API
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

  // loads selected pokemon details from api
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

  // returns list of pokemon
  function getAll() {
    return pokemonList;
  }

  // displays details from loadDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (){
      showModal(pokemon);
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
// end IIFE

// loads pokemon buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
