// IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: .7,
      types: ['grass','poison']
    },
    {
      name: 'Charmander',
      height: .6,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: .5,
      types: ['water']
    },
    {
      name: 'Pidgey',
      height: .3,
      types: ['flying','normal']
    },
    {
      name: 'Weedle',
      height: .3,
      types: ['bug' , 'poison']
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      typeof pokemon !== null &&
      'name','height','types' in pokemon
    ){
      pokemonList.push(pokemon);
      console.log("Object.keys requirement passed.")
    }else{
      console.log("Error: Please follow template to add Pokemon.")
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    list.appendChild(listPokemon);
    buttonListener(button, pokemon);
  }

  function buttonListener(button, pokemon) {
    document.querySelector('button');
    button.addEventListener('click', function (event){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// add pokemon to array
pokemonRepository.add({ name: 'Weedle', height: .3, types: ['bug' , 'poison']});


// displays Pokemon name as button
pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
});
