const Discord = require('discord.js');
const client = new Discord.Client();
const Game = require('./game.js');
var key = require('./key.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.bot) {return}
    if (msg.content === '!play') {
        Game.loadGame(msg);
    }
});

client.login(key.key());