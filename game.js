module.exports = {
    loadGame: function (msg) {
        console.log("Game Starting!");
        setup(msg);
    }
}

var grid = [];
var gameMessage;


function setup(msg) {
    gameMessage = null;
    grid = createGrid();
    grid = updateGrid(grid, 2, 2, "⬜");
    sendGameEmbed(msg, convertGrid(grid));
}

function sendGameEmbed(msg, txtgrid) {
    if (!gameMessage){
        msg.channel.send(createEmbed(false, false, txtgrid)).then(bmsg => {
            gameMessage = bmsg;
            reactMessage(gameMessage);
        });
    } else {
        gameMessage.edit(createEmbed(false, false, txtgrid)).then(bmsg => {
            gameMessage = bmsg;
            reactMessage(gameMessage);
        });
    }
}

function reactMessage(msg) {
    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    msg.react('👍').then(() => msg.react('👎')).then(() => {
        awaitReactions(msg, filter);
    });
}

function awaitReactions(msg, filter) {
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            moveCube();
            console.log("YOOO");
            
		} else {
            // msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            // moveCube();
        }
        console.log("YOOOOOOO!")
	})
	.catch(collected => {
		msg.reply('you reacted with neither a thumbs up, nor a thumbs down.');
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

function moveCube() {
    console.log("SAY SOMETHN G");
    grid = createGrid();
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    grid = updateGrid(grid, y, x, "⬜");
    sendGameEmbed(msg, convertGrid(grid));
}
