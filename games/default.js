var grid = [];

module.exports = {
    loadGame: function () {
        console.log("Game Default Loading...");
        grid = createGrid();
        grid = updateGrid(grid, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), "⬜");
        return convertGrid(grid);
    },
    updateGame: function (action) {
        return moveCube(action);
    }, getActions: function () {
        return ['⬆️', '⬇️', '⬅️', '➡️'];
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

function moveCube(direction) {
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

    switch(direction) {
        case 0:
            if (y > 0) {
                y -= 1;
            }
        break;
        case 1:
            if (y < 11) {
                y += 1;
            }
        break;
        case 2:
            if (x > 0) {
                x -= 1;
            }
        break;
        case 3:
            if (x < 11) {
                x += 1;
            }
        break;
    }

    grid = updateGrid(grid, y, x, "⬜");
    return convertGrid(grid);
}