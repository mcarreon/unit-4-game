//holds and controls user 
var user = {
    pickedHero: {},
    hasPicked: false
};
//controls game function
var gameCtrl = {
    setUp: function (element) {
        //sets user hero
        var pick = $(element).attr('value');
        user.pickedHero = gameVar.availChar[pick];
        user.hasPicked = true;

        //moves user hero to char slot, 
        gameCtrl.createCard('hero', pick);

        //inserts attack button
        $('.user-char-slot').before('<button class="attack-btn btn-outline-danger btn">Attack</button>');

        //populates enemy list 
        for (var i = 0; i < gameVar.availChar.length; i++) {
            if (i != pick) {
                gameVar.enemyList.push(gameVar.availChar[i]);
            }
        }
        //moves enemy list to enemy dugout
        for (var i = 0; i < gameVar.enemyList.length; i++) {
            gameCtrl.createCard('enemyTeam', i);
        }
        //removes available characters list
        $('.user-char-list').empty();
        $('h1').text('Pick Your Opponent');
    },
    createCard: function (type, index) {
        var card = $('<div>');
        card.addClass('char card');
        var cardBody = $('<div>');
        cardBody.addClass('card-body');
        var cardImg = $('<img>');
        var cardHealth = $('<div>');
        cardHealth.addClass('card-subtitle');

        if (type === 'initial') {
            card.attr("value", index);
            cardImg.attr('src', gameVar.availChar[index].img);
            cardImg.addClass('card-image-top');
            var initial = $('<div>');
            initial.addClass('card-title');
            initial.text(gameVar.availChar[index].name);
            cardHealth.text(gameVar.availChar[index].health);

            cardBody.append(cardImg);
            $('.user-char-list').append(
                card.append(
                    cardBody.append(initial)
                )
            );
            cardBody.append(cardHealth);

        }
        else if (type === 'defender') {
            card.addClass('defender');
            cardImg.attr('src', gameVar.currentDefender.img);
            cardHealth.text(gameVar.currentDefender.health);
    
            var defender = $('<div>');
            defender.addClass('card-title');
            defender.text(gameVar.enemyList[index].name);
    
            cardBody.append(cardImg);
            $('.enemy-battle-zone').append(
                card.append(
                    cardBody.append(defender)
                )
            );
            cardBody.append(cardHealth);
        }
        else if (type === 'hero') {
            card.addClass('hero');
            cardImg.attr('src', gameVar.availChar[index].img);
            cardHealth.text(user.pickedHero.health);
    
            var hero = $('<div>');
            hero.addClass('card-title');
            hero.text(user.pickedHero.name);
    
            cardBody.append(cardImg);
            $('.user-char-slot').append(
                card.append(
                    cardBody.append(hero)
                )
            );
            cardBody.append(cardHealth);
        }
        else if (type === 'enemyTeam') {
            card.attr({
                value: index
            });
            cardImg.attr('src', gameVar.enemyList[index].img);
            cardHealth.addClass('def-index' + index);
            cardHealth.text(gameVar.enemyList[index].health);

            var enemy = $('<div>');
            enemy.addClass('card-title');
            enemy.text(gameVar.enemyList[index].name);

            cardBody.append(cardImg);
            $('.enemy-char-list').append(
                card.append(
                    cardBody.append(enemy)
                )
            );
            cardBody.append(cardHealth);
        }
    },
    moveDefender: function (element, index) {
        gameVar.currentDefender = gameVar.enemyList[index];
        
        gameCtrl.createCard('defender', index);

        gameVar.defenderPres = true;

        $(element).fadeTo("slow", 0.5);
        $('h1').text('Fight!');
    },
    resetDefender: function () {
        var dummy = '.def-index' + gameVar.curDefenderIndex;
        $(dummy).text(0);
        gameVar.defenderPres = false;
        $('.enemy-battle-zone').empty();
        $('h1').text('Pick Next Enemy');
    },
    gameOver: function () {
        if (user.pickedHero.alive) {
            var enemiesAlive = false;
            for (var i = 0; i < gameVar.enemyList.length; i++) {
                if (gameVar.enemyList[i].alive) {
                    enemiesAlive = true;
                }
            }
            if (enemiesAlive === false) {
                $('h1').text('You Win!');
            }
        } else {
            $('h1').text('You Lose!');
        }

    },
    userAttack: function () {
        if (user.pickedHero.alive) {
            gameVar.currentDefender.health -= user.pickedHero.ap;
            $('.dialog').text('You did ' + user.pickedHero.ap + ' damage!');
            if (gameVar.currentDefender.health > 0) {

                $('.defender .card-subtitle').text(gameVar.currentDefender.health);

                user.pickedHero.health -= gameVar.currentDefender.counterAP;
                $('.enemy-dialog').text( gameVar.currentDefender.name + ' did ' + gameVar.currentDefender.counterAP + ' damage!');
                if (user.pickedHero.health > 0) {
                    $('.hero .card-subtitle').text(user.pickedHero.health);
                } 
                else {
                    user.pickedHero.health = 0;
                    $('.hero .card-subtitle').text(user.pickedHero.health);
                    user.pickedHero.alive = false;
                }

            } 
            else {
                gameVar.currentDefender.health = 0;
                $('.defender .card-subtitle').text(gameVar.currentDefender.health);
                $('.dialog').text('You defeated ' + gameVar.currentDefender.name + '.');
                $('.enemy-dialog').text('');
                gameVar.currentDefender.alive = false;
            }
            user.pickedHero.ap += user.pickedHero.baseAP;
        }
    },
    resetGame: function () {
        //resets display
        $('h1').text('Pick Your Character');
        $('.user-char-list').empty();
        $('.enemy-char-list').empty();
        $('.enemy-battle-zone').empty();
        $('.user-char-slot').empty();
        $('.dialog').text('');
        $('.enemy-dialog').text('');
        $('.attack-btn').remove();

        //repopulates avail characters
        for (var i = 0; i < gameVar.availChar.length; i++) {
            gameVar.availChar[i].health = gameVar.availChar[i].baseVals[0];
            gameVar.availChar[i].ap = gameVar.availChar[i].baseVals[1];
            gameVar.availChar[i].alive = true;
            gameCtrl.createCard('initial', i);
        }

        user.pickedHero = {};
        user.hasPicked = false;
        gameVar.defenderPres = false;
        gameVar.enemyList = [];
        gameVar.curDefenderIndex = null;
        gameVar.currentDefender = {};
        
    }

};
//holds variables 
var gameVar = {
    availChar: [
        obiWan = {
            name: 'Obi-Wan Kenobi',
            baseVals: [120, 6],
            health: 120,
            ap: 6,
            baseAP: 6,
            counterAP: 8,
            alive: true,
            img: 'assets/images/obi.jpg'

        },
        luke = {
            name: 'Luke Skywalker',
            baseVals: [100, 8],
            health: 100,
            ap: 8,
            baseAP: 8,
            counterAP: 8,
            alive: true,
            img: 'assets/images/luke.jpg'
        },
        mace = {
            name: 'Mace Windu',
            baseVals: [150, 5],
            health: 150,
            ap: 5,
            baseAP: 5,
            counterAP: 12,
            alive: true,
            img: 'assets/images/mace.jpg'
        },
        darth = {
            name: 'Darth Maul',
            baseVals: [180, 2],
            health: 180,
            ap: 2,
            baseAP: 2,
            counterAP: 14,
            alive: true,
            img: 'assets/images/maul.jpg'

        }
    ],
    enemyList: [],
    defenderPres: false,
    currentDefender: {},
    curDefenderIndex: null,

};

$(document).ready(function() {
    for (var i = 0; i < gameVar.availChar.length; i++) {
        gameCtrl.createCard('initial', i);
    }
});

$('.user-char-list').on('click', '.char', function () {
    if (!user.hasPicked) {
        gameCtrl.setUp(this);
    }
    console.log(test());
});

$('.enemy-char-list').on('click', '.char', function () {
    var val = $(this).attr('value');


    if (!gameVar.defenderPres && gameVar.enemyList[val].alive) {
        gameVar.curDefenderIndex = val;
        gameCtrl.moveDefender(this, val);
    }

});

$('.arena').on('click', '.attack-btn', function () {
    if (gameVar.defenderPres) {
        gameCtrl.userAttack();

        if (!gameVar.currentDefender.alive) {
            gameCtrl.resetDefender();
        }
    }
    gameCtrl.gameOver();
});

$('.reset-btn').on('click', function () {
    gameCtrl.resetGame();
});

function test() {
    console.log(user);
    console.log(gameCtrl);
    console.log(gameVar);
}