const TicTacToe = require('./games/tictactoe.js');
const defaultGame = require('./games/default.js');
const Controls = require('./controls.js');

var games = [defaultGame, TicTacToe];

module.exports = {
    loadGame: function (msg) {
        setup(msg);
    }
}

function setup(msg) {
    Controls.sendEmbed(null, msg, "Pick a game" + gameList()).then(gameMsg => {
        Controls.react(gameMsg, msg, gameList(true)).then(result => {
            startGame(gameMsg, msg, result);
        })
    });
}

function gameList(emojiList) {
    if (emojiList) {
        let emojis = [];
        games.forEach(g => {
            emojis.push(g.info().emoji);
        })
        return emojis;
    } else {
        let list = "";
        games.forEach(g => {
            list += "\n" + g.info().emoji + " = " + g.info().name;
        })
        return list
    }
}

function startGame(gameMsg, msg, gameNumber) {
    let game = games[gameNumber];

    Controls.sendEmbed(gameMsg, msg, game.loadGame(), game.info().name).then(gmsg => {
        gameLoop(gmsg, msg, game);
    });
}

function gameLoop(gameMsg, playerMsg, game) {
    Controls.react(gameMsg, playerMsg, game.info().actions).then(result => {
        Controls.sendEmbed(gameMsg, playerMsg, game.updateGame(result), game.info().name).then(gmsg => {
            gameLoop(gmsg, playerMsg, game);
        });
    })
}