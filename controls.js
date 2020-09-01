module.exports = {
    react: function (gmsg, msg, options) {

        const filter = (reaction, user) => {
            return options.includes(reaction.emoji.name) && user.id === msg.author.id;
        };

        var result = new Promise(function (resolve) {

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
                            gmsg.reactions.removeAll().then(e => {
                                resolve(i);
                            }).catch(error => {
                                console.error('Failed to clear reactions: ', error);
                                resolve(i);
                            });
                        }
                    }
                })
                .catch(collected => {
                    gmsg.edit(module.exports.createEmbed(false, 9911111, 'Game Stopped Due to inactivity'));
                    gmsg.reactions.removeAll().catch(e => console.log(e));
                });
            }

        })

        return result;
    },
    createEmbed: function (title, color, description, footer) {
        if (!title){title = "Discord Bot Game"};
        if (!color) {color = 7339251};
        if (!description) {description = "An Awesome Bot built by BeanDream."};
        if (!footer) {footer = "~Designed by BeanDream"};
        var embed = {
            "title": title,
            "color": color,
            "description": description,
            "footer": {
                "text": footer
            }
        }
        return {embed};
    },
    sendEmbed: function (gmsg, msg, gameText, gameTitle, color) {
        var gameMessage = new Promise(function (resolve, reject) {
            let message = module.exports.createEmbed(gameTitle, color, gameText, msg.author.username + "'s Game");
            if (!gmsg){
                msg.channel.send(message).then(bmsg => {
                    resolve(bmsg);
                });
            } else {
                gmsg.edit(message).then(bmsg => {
                    resolve(bmsg);
                });
            }

        })
        return gameMessage;
    }
}

