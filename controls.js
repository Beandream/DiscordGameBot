module.exports = {
    react: function (gmsg, msg, options) {
        const filter = (reaction, user) => {
            return options.includes(reaction.emoji.name) && user.id === msg.author.id;
        };


        var result = new Promise(function (resolve, reject) {
            
            let i = 0;
            reactAll(options[i]);

            function reactAll(e) {
                gmsg.react(e).then(() => {
                    i++;
                    if (i < options.length) {
                        reactAll(options[i]);
                    } else {
                        awaitReactions(gmsg, filter, msg, options);
                    }
                }).catch(err => {console.log(err)});
            }
    
            function awaitReactions(gmsg, filter, msg, options) {
                gmsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                    
                    for(let i = 0; i < options.length; i++) {
                        if (reaction.emoji.name === options[i]) {
                            console.log(i + " was pressed");
                            resolve(i);
                        }
                    }
                })
                .catch(collected => {
                    msg.channel.send('Game Stopped Due to inactivity');
                });
            }

        })
        return result;
    },
    createEmbed: function (title, color, description) {
        if (!title){title = "Discord Bot Game"};
        if (!color) {color = 7339251};
        if (!description) { "GameLoading" };
        var embed = {
            "title": title,
            "color": color,
            "description":description
        }
        return {embed};
    },
    sendEmbed: function (msg, gameText) {
        var gameMessage = new Promise(function (resolve, reject) {
            let message = module.exports.createEmbed(msg.author.username + "'s Game", false, gameText);
            if (!gameMessage){
                msg.channel.send(message).then(bmsg => {
                    resolve(bmsg);
                });
            } else {
                gameMessage.edit(message).then(bmsg => {
                    resolve(bmsg);
                });
            }

        })
        return gameMessage;
    }
}

