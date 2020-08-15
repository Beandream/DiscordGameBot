module.exports = {
    loadGame: function (msg) {
        console.log("Game Starting!");
        setup(msg);
    }
}

var grid = [];
var gameMessage;


function setup(msg) {
    gameMessage = null; //resets the game
    grid = createGrid();
    grid = updateGrid(grid, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "⬜");
    sendGameEmbed(msg, convertGrid(grid));
}

function sendGameEmbed(msg, txtgrid) {
    if (!gameMessage){
        msg.channel.send(createEmbed(false, false, txtgrid)).then(bmsg => {
            gameMessage = bmsg;
            reactMessage(gameMessage, msg);
        });
    } else {
        gameMessage.edit(createEmbed(false, false, txtgrid)).then(bmsg => {
            gameMessage = bmsg;
            reactMessage(gameMessage, msg);
        });
    }
}

function reactMessage(gmsg, msg) {
    const filter = (reaction, user) => {
        return ['⬆️', '⬇️', '⬅️', '➡️'].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    gmsg.react('⬆️').then(() => gmsg.react('⬇️')).then(() => gmsg.react('⬅️')).then(() => gmsg.react('➡️')).then(() => {
        awaitReactions(gmsg, filter, msg);
    });
}

function awaitReactions(gmsg, filter, msg) {
    gmsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '⬆️') {
            doAction(msg, gmsg, 'UP');
		} else if (reaction.emoji.name === '⬇️') {
            doAction(msg, gmsg, 'DOWN');
        } else if (reaction.emoji.name === '⬅️') {
            doAction(msg, gmsg, 'LEFT');
        } else {
            doAction(msg, gmsg, 'RIGHT');
        }
	})
	.catch(collected => {
        msg.channel.send('Game Stopped Due to inactivity');
        console.log(collected);
	});
}

function doAction(msg, gmsg, direction) {
    gmsg.reactions.removeAll().then(e => {
        moveCube(direction, msg);
    }).catch(error => {
        console.error('Failed to clear reactions: ', error);
        moveCube(direction, msg);
    });
}

function createEmbed(title, color, description) {
    if (!title){title = "Discord Bot Game"};
    if (!color) {color = 7339251};
    if (!description) { "GameLoading" };
    var embed = {
        "title": title,
        "color": color,
        "description":description
    }
    return {embed};
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

    if (direction == 'UP') {
        if (y > 0) {
            y -= 1;
        }
    } else if (direction == 'DOWN') {
        if (y < 11) {
            y += 1;
        }
    } else if (direction == 'LEFT') {
        if (x > 0) {
            x -= 1;
        }
    } else if (direction == 'RIGHT'){
        if (x < 11) {
            x += 1;
        }
    }
    grid = updateGrid(grid, y, x, "⬜");
    sendGameEmbed(msg, convertGrid(grid));
}
