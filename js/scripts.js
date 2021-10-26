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

//function to display Pokemon name with height & highlight large Pokemon
function displayPokemon(pokemon) {
  document.write(pokemon.name + ` (height: ${pokemon.height}) `);
  if (pokemon.height >= .6)
  document.write(' - Wow! That\'s big!');
  document.write('<br>');
}

//lists Pokemon name with height & highlights large Pokemon
pokemonList.forEach(displayPokemon);
