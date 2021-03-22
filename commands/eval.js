module.exports.run = async (bot, message, msgArray, con) => {
	if(!bot.cfg.allowEval) return message.reply("This command is disabled")
	if(message.author.id !== bot.cfg.owner) return message.reply("Access denied")
	
	str = msgArray.slice(1).join(" ")
	eval(str)
}

module.exports.name = "eval"