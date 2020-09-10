module.exports = {
    loadGame: function () {
        console.log("Game TicTacToe Loading...");
        actions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        updateGrid();
        return gridToText(grid);
    },
    updateGame: function (action) {
        updateGrid(action, "❎");
        play();
        return gridToText(grid);
    }, info: function () {
        return {
            actions: actions,
            name: "TicTacToe",
            emoji: "🇹"
        };
    }
}

var actions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

var grid;
var win = false;

function play() {
    if (win == true) {return};

    var slots = [];
    grid.forEach(function(g, i){
        if (g == "❎" || g == "⭕") {} else {
            slots.push(i);
        }
    });
    let num = Math.floor((Math.random() * slots.length));
    updateGrid(slots[num], "⭕");
}

function updateGrid(pos, type) {
    if (win == true) {
        grid = null;
        actions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        win = false;
    }
    if (!grid) {
        grid = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

    } else if(pos >  -1 && type) {

        let j = pos;
        for (let i = 0; i < j + 1; i++) {
            if (grid[i] == "❎" || grid[i] == "⭕") {
                j++;
            }
        }
        grid[j] = type;
        actions.splice(pos, 1);

        let w = checkWin(grid);
        if (w) {
            grid = [w, w, w, w, w, w, w, w, w];
            actions = [("✔️")];
            win = true;
        } else if (actions.length < 1) {
            actions = [("✔️")];
            win = true;
        }
    } else {
        console.log("something didn't exsist.");
    }
}

function checkWin(grid) {
    if (grid[0] == grid[1] && grid[1] == grid[2]) {
        return grid[0];
    } else if (grid[3] == grid[4] && grid[4] == grid[5]){
        return grid[3];
    } else if (grid[6] == grid[7] && grid[7] == grid[8]){
        return grid[6];
    } else if (grid[0] == grid[3] && grid[3] == grid[6]) {
        return grid[0];
    } else if (grid[1] == grid[4] && grid[4] == grid[7]){
        return grid[1];
    } else if (grid[2] == grid[5] && grid[5] == grid[8]){
        return grid[2];
    }else if (grid[0] == grid[4] && grid[4] == grid[8]) {
        return grid[0];
    } else if (grid[2] == grid[4] && grid[4] == grid[6]){
        return grid[2];
    } else {
        return false;
    }
}

function gridToText(g) {
    if (typeof g == "string") {
        return grid + "\n" + g;
    }
    let text = "";
    text += g[0] + g[1] + g[2] + "\n";
    text += g[3] + g[4] + g[5] + "\n";
    text += g[6] + g[7] + g[8] + "\n";
    return text;
}