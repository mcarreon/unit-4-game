//holds the users pokemon, and user variables
var user = {
  pickedPokemon: {},
  hasPicked: false,
  gameType: 'basic'
};

//controls game flow, and holds available pokemon and general variables
var game = {
  attackZoneOccupied: false,
  currentEnemy: {},

  userPokemonList: [
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
  enemyPokemonList: [
    (ratata = {
      name: 'Ratata',
      attackPower: 8,
      dodgeChance: 10,
      health: 50
    }),
    (raticate = {
      name: 'Raticate',
      attackPower: 14,
      dodgeChance: 12,
      health: 65
    }),
    (sandshrew = {
      name: 'Sandshrew',
      attackPower: 15,
      dodgeChance: 12,
      health: 65
    }),
    (zubat = {
      name: 'Zubat',
      attackPower: 10,
      dodgeChance: 20,
      health: 45
    }),
    (pidgey = {
      name: 'Pidgey',
      attackPower: 9,
      dodgeChance: 10,
      health: 55
    }),
    (ekans = {
      name: 'Ekans',
      attackPower: 13,
      dodgeChance: 2,
      health: 50
    }),
    (meowth = {
      name: 'Meowth',
      attackPower: 12,
      dodgeChance: 7,
      health: 40
    }),
    (machop = {
      name: 'Machop',
      attackPower: 17,
      dodgeChance: 3,
      health: 80
    }),
    (grimer = {
      name: 'Grimer',
      attackPower: 5,
      dodgeChance: 2,
      health: 90
    }),
    (koffing = {
      name: 'Koffing',
      attackPower: 7,
      dodgeChance: 3,
      health: 90
    })
  ],
  pickedEnemyPokemon: [],

  changeName: function(name, pokemon) {
    if (name != null && name != '') {
      pokemon.name = name;
    }
  },
  pickEnemyPokemon: function() {
    var randomList = [];
    for (var i = 0; i < 6; i++) {
      var random = Math.floor(
        Math.random() * (this.enemyPokemonList.length - 0)
      );
      while (randomList.includes(random)) {
        random = Math.floor(Math.random() * (this.enemyPokemonList.length - 0));
      }
      randomList.push(random);
      this.pickedEnemyPokemon.push(this.enemyPokemonList[random]);
    }
    randomList = [];
  },
  displayPokemon: function() {
    //moves user picked pokemon to battle zone
    $('.arena-defend-zone').text(user.pickedPokemon.name + '\n' + user.pickedPokemon.health);
    $('.user-pokemon-list').empty();
    //displays enemy pokemon
    var i = 0;
    while (i < this.pickedEnemyPokemon.length) {
      var list = $('<button>');
      list.val(i);
      list.text(this.pickedEnemyPokemon[i].name);
      $('.enemy-pokemon-list').append(list);
      i++;
    }
  },
  mvEnemyToAttackZone: function (element) {
    if (!game.attackZoneOccupied) {
      var toMove = $('<button>');
      var curVal = $(element).val();
      game.currentEnemy = game.pickedEnemyPokemon[curVal];
      toMove.text(game.currentEnemy.name + '\n' + game.currentEnemy.health);
  
      $('.arena-attack-zone').append(toMove);
      $(element).remove();
      game.attackZoneOccupied = true;
    }
  },
  updateDisplay: function () {
    $('.arena-attack-zone > button').text(game.currentEnemy.name + '\n' + game.currentEnemy.health);
    $('.arena-defend-zone').text(user.pickedPokemon.name + '\n' + user.pickedPokemon.health);
  }
};

//controls game flow with assignment guidelines
var gameLogicAssign = {

  basicizeUserPokemon: function () {
    game.userPokemonList[0].attackPower = 8;
    game.userPokemonList[0].basePower = 8;
    game.userPokemonList[0].counterPower = 6;

    game.userPokemonList[1].attackPower = 5;
    game.userPokemonList[1].basePower = 5;
    game.userPokemonList[1].counterPower = 4;
    
    game.userPokemonList[2].attackPower = 6;
    game.userPokemonList[2].basePower = 6;
    game.userPokemonList[2].counterPower = 7;
  },
  userAttack: function () {
    game.currentEnemy.health -= user.pickedPokemon.attackPower;
    
    $('.user-dialog').text('You did ' + user.pickedPokemon.attackPower + ' damage to ' + game.currentEnemy.name);

    user.pickedPokemon.attackPower += user.pickedPokemon.basePower;

    if (game.currentEnemy.health > 0) {
      user.pickedPokemon.health -= game.currentEnemy.attackPower;
      $('.enemy-dialog').text(game.currentEnemy.name + ' did ' + game.currentEnemy.attackPower + ' damage');
    } 
    else {
      $('.enemy-dialog').text(game.currentEnemy.name + " has fainted.");
      $('.arena-attack-zone').empty();
      game.attackZoneOccupied = false;
    }
    


  },
  enemyAttack: function () {
    user.pickedPokemon.health -= game.currentEnemy.attackPower;
    $('.enemy-dialog').text(game.currentEnemy.name + ' did ' + game.currentEnemy.attackPower + ' damage');
    
    game.currentEnemy.health -= user.pickedPokemon.basePower;
    $('.user-dialog').text('You did ' + user.pickedPokemon.basePower + ' damage to ' + game.currentEnemy.name);

  }

  // Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
  // Each time the player attacks, their character's Attack Power increases by its base Attack Power. z
  // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
  // The enemy character only has Counter Attack Power.
  // Unlike the player's Attack Points, Counter Attack Power never changes.
  // The Health Points, Attack Power and Counter Attack Power of each character must differ.
  // No characters in the game can heal or recover Health Points.
  // A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.
  // Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
};



$('.user-pokemon-list').on('click', '.user-pokemon', function() {
  if (!user.hasPicked) {
    //populates enemy pokemon list
    game.pickEnemyPokemon();
    //changes rules based off ruleset assign/personal
    if (user.gameType === 'basic') {
      for (var i = 0; i < 3; i++) {
        game.pickedEnemyPokemon.pop();
      }
      gameLogicAssign.basicizeUserPokemon();
    }

    var pick = $(this).val();
    user.pickedPokemon = game.userPokemonList[pick];
    //asks user if they want to change their pokemons name
    var change = confirm('Would you like to nickname your pokemon?');
    if (change) {
      var nameToChange = prompt('Please enter desired name');
      game.changeName(nameToChange, user.pickedPokemon);
    }
    user.hasPicked = true;
    game.displayPokemon();

    //console.log(user.pickedPokemon);
    //console.log(game.pickedEnemyPokemon);
  }
});

$('.enemy-pokemon-list').on('click', 'button', function () {
  game.mvEnemyToAttackZone(this);
});

$('.arena-attack-zone').on('click', function () {
  gameLogicAssign.userAttack();
  game.updateDisplay();
  gameLogicAssign.enemyAttack();
  game.updateDisplay();
});
