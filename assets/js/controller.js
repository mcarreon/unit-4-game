var userPokemon = [
    charmander = {
        name: 'Charmander',
        element: 'fire'
    }, 
    squirtle = {
        name: 'Squirtle',
        element: 'water'
    }, 
    bulbasaur = {
        name: 'Bulbasaur',
        element: 'grass'
    }
]

var gameController = {
    changePokeName: function(name, pokemon) {
        pokemon.name = name;
    }
    
}