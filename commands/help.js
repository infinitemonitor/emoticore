module.exports.run = async (bot, message, msgArray, con) => {
	message.reply(`You can view bot help at: ${bot.cfg.helpLink}`)
}

module.exports.name = "help"