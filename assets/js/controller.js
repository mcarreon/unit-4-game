//holds the users pokemon
var userController = {
  pickedPokemon: {},
  hasPicked: false
};

//controls game flow, and holds available pokemon
var gameController = {
  userPokemon: [
    (charmander = {
      name: 'Charmander',
      element: 'fire',
      attackPower: 20,
      dodgeChance: 10,
      health: 100
    }),
    (bulbasaur = {
      name: 'Bulbasaur',
      element: 'grass',
      attackPower: 10,
      dodgeChance: 5,
      health: 140
    }),
    (squirtle = {
      name: 'Squirtle',
      element: 'water',
      attackPower: 15,
      dodgeChance: 20,
      health: 80
    })
  ],
  changeName: function(name, pokemon) {
    if (name != null) {
      pokemon.name = name;
    }
  }
};

$('.user-pokemon-list').on('click', '.user-pokemon', function() {
  if (!userController.hasPicked) {
    var pick = $(this).val();
    userController.pickedPokemon = gameController.userPokemon[pick];

    //asks user if they want to change their pokemons name
    var change = confirm('Would you like to nickname your pokemon?');
    if (change) {
      var nameToChange = prompt('Please enter desired name');
      gameController.changeName(nameToChange, userController.pickedPokemon);
    }
    userController.hasPicked = true;
    console.log(userController.pickedPokemon);
  }
});
