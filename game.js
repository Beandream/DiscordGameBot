const defaultGame = require('./games/default.js');
const Controls = require('./controls.js');

module.exports = {
    loadGame: function (msg) {
        setup(msg);
    }
}

var gameMessage; //The actual message in discord that is displaying the game.


function setup(msg) {
    gameMessage = null; //resets the game
    Controls.sendEmbed(gameMessage, msg, "Pick a game\n" + defaultGame.info().emoji + " = " + defaultGame.info().name).then(gmsg => {
        gameMessage = gmsg;
        Controls.react(gmsg, msg, ['🇩', '🇧']).then(result => {
            startGame(msg, result);
        })
    });
}

function startGame(msg, game) {
    switch(game) {
        case 0:
        Controls.sendEmbed(gameMessage, msg, defaultGame.loadGame(msg, gameMessage)).then(gmsg => {
            gameMessage = gmsg;
            game0(msg);
        });
        break;
        case 1:
            msg.channel.send("That game doesn't exsist yet... bruh");
        break;
    }
}

function game0(msg) {
    Controls.react(gameMessage, msg, defaultGame.info().actions).then(result => {
        Controls.sendEmbed(gameMessage, msg, defaultGame.updateGame(result)).then(gmsg => {
            gameMessage = gmsg;
            game0(msg);
        });
    })
}