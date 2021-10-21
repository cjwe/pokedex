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
//lists Pokemon name with height & highlights small Pokemon
for (let i=0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ` (height: ${pokemonList[i].height}) `);
  if (pokemonList[i].height >= .7)
  document.write(' - Wow! That\'s big! ');
  document.write('<br>');
  }
