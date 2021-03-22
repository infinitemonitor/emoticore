module.exports.run = async (bot, message, msgArray, con) => {
	if(!message.member.hasPermission("MANAGE_EMOJIS")) return
	if(!msgArray[1]) return
	
	id = bot.findEmote(msgArray, message, 1)
	e = message.guild.emojis.cache.get(id)
	if(!e) return
	
	e.delete()
	.then(message.reply("Emote deleted"))
}

module.exports.name = "remove"