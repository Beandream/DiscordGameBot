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
    let slots = [];
    grid.forEach(function(g, i){
        if (g == "🔲") {
            slots.push(i);
        }
    });
    let num = Math.floor((Math.random() * slots.length));
    updateGrid(num, "⭕");
}

function updateGrid(pos, type) {
    if (win == true) {
        grid = null;
        actions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        win = false;
    }
    if (!grid) {
        grid = [];
        for(let i = 0; i < 9; i++) {
            grid.push("🔲");
        }

    } else if(pos >  -1 && type) {

        let j = pos;
        for (let i = 0; i < j + 1; i++) {
            if (grid[i] != "🔲") {
                j++;
            }
        }
        grid[j] = type;
        actions.splice(pos, 1);
        if (actions.length < 1) {
            actions.push("✔️");
            win = true;
        }

        // if (pos == 0) {
        //     if (grid[pos] == "🔲") {
        //         grid[pos] = type;
        //         actions.splice(pos, 1);
        //     } else {
        //         console.log("spot " + pos + " was already taken");
        //     }
        // } else {
        //     let j = pos;
        //     for (let i = 0; i < j; i++) {
        //         if (grid[i] != "🔲") {
        //             if (j < 7) {
        //                 j++;
        //             }                
        //         }
        //         console.log(i + " Is this Zero?")
        //     }
        // }

        // let j = pos;
        // for (let i = 0; i <= j; i++) {
        //     if (grid[i] != "🔲") {
        //         if (j < 7) {
        //             j++;
        //         }                
        //     }
        //     console.log(i + " Is this Zero?")
        // }

        // if (grid[pos + j] == "🔲") {
        //     grid[pos + j] = type;
        //     actions.splice(pos, 1);
        // } else {
        //     console.log("We had an Error. Rip");
        // }
    } else {
        console.log("something didn't exsist.");
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