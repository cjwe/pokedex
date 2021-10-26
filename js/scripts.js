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
      console.log(Object.keys(pokemon)) === console.log(Object.keys(pokemonList[0]))
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

  return {
    add: add,
    getAll: getAll
  };
})();

// adds new Pokemon to array as object - use {name: '', height: , types:[]}
pokemonRepository.add({name: 'Jigglypuff', height: .5, types: ['fariy' , 'normal']});

// console logs complete list of Pokemon
console.log(pokemonRepository.getAll());

// function to display Pokemon name with height & highlight large Pokemon
function displayPokemon(pokemon) {
  document.write(pokemon.name + ` (height: ${pokemon.height}) `);
  if (pokemon.height >= .6)
  document.write(' - Wow! That\'s big!');
  document.write('<br>');
}

// displays Pokemon name with height & highlights large Pokemon
pokemonRepository.getAll().forEach(displayPokemon);

// search function
const filterArray=pokemonRepository.getAll().filter(word => word.name === "Bulbasaur")

console.log(filterArray);
