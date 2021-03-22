module.exports.run = async (bot, message, msgArray, con) => {
	message.reply(`Emoticore provides emote usage statistics for servers.\nIt is currently private, though if you own a large server which needs a way to track emote usage, ask ${bot.cfg.ownerTag}\n\nSee ++help for commands`)
}

module.exports.name = "about"