const Discord = require('discord.js');
const client = new Discord.Client();
const Game = require('./game.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.bot) {return}
    if (msg.content === '!play') {
        msg.reply('Ok! Loading Game!');
        Game.loadGame(msg);
    }
});

client.login('NDMzNzY0NjEwMTE0MzIyNDUy.Ws6Uxg.AyiT-LXnv4aQiJazCmhjbrQdvd0');