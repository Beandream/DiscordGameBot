const defaultGame = require('./games/default.js');
const Controls = require('./controls.js');

module.exports = {
    loadGame: function (msg) {
        console.log("Game Starting!");
        setup(msg);
    }
}

var gameMessage; //The actual message in discord that is displaying the game.


function setup(msg) {
    gameMessage = null; //resets the game
    Controls.sendEmbed(msg, "Pick a game\n :regional_indicator_d: = DefaultGame").then(gmsg => {
        gameMessage = gmsg;
        Controls.react(gmsg, msg, ['🇩', '🇧']).then(result => {
            startGame(msg, result);
        })
    });
}

function startGame(msg, game) {
    switch(game) {
        case 0:
            defaultGame.loadGame(msg, gameMessage);
        break;
        case 1:
            msg.channel.send("That game doesn't exsist yet... bruh");
        break;
    }
}

function convertGrid(lines) {
    var text = "";
    lines.forEach(y => {
        y.forEach(x => {
            text += x;
        })
        text += "\n"
    });
    return text;
}