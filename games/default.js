const Controls = require('../controls.js');

module.exports = {
    loadGame: function (msg, gmsg) {
        console.log("Game Default Loading...");
        if (!gmsg) {return}
        setup(msg, gmsg);
    }
}

var grid = [];
var gameMessage;

function setup(msg, gmsg) {
    gameMessage = gmsg;

    grid = createGrid();
    grid = updateGrid(grid, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "⬜");

        gameMessage.edit(Controls.createEmbed(msg.author.username + "'s Game", false, txtgrid)).then(bmsg => {
            gameMessage = bmsg;
            Controls.react(gameMessage, msg,  ['⬆️', '⬇️', '⬅️', '➡️']).then(function(result) {
                gameMessage.reactions.removeAll().then(e => {
                    moveCube(result, msg);
                }).catch(error => {
                    console.error('Failed to clear reactions: ', error);
                    moveCube(result, msg);
                });
            });
        });
}

function createGrid() {
    var lines = [];
    for (var l = 0; l < 12; l++) {
        var blocks = [];
        for(var b = 0; b < 12; b++) {
            blocks.push("⬛");
        }
        lines.push(blocks);
    }
    return lines;
}

function updateGrid(grid, y, x, type) {
    var lines = grid;
    if (!type){type = "⬛";}

    for (var l = 0; l < lines.length; l++) {
        for(var b = 0; b < lines[l].length; b++) {
            if (y == l && x == b) {
                lines[l][b] = type;
           }
        }
    }
    return lines;
}

function moveCube(direction, msg) {
    var y;
    var x;

    for (var l = 0; l < grid.length; l++) {
        for(var b = 0; b < grid[l].length; b++) {
            if (grid[l][b] == "⬜") {
                y = l;
                x = b;
                grid = updateGrid(grid, y, x, "⬛");
           }
        }
    }

    if (direction == 0) {
        if (y > 0) {
            y -= 1;
        }
    } else if (direction == 1) {
        if (y < 11) {
            y += 1;
        }
    } else if (direction == 2) {
        if (x > 0) {
            x -= 1;
        }
    } else if (direction == 3){
        if (x < 11) {
            x += 1;
        }
    }
    grid = updateGrid(grid, y, x, "⬜");
    sendGameEmbed(msg, convertGrid(grid));
}