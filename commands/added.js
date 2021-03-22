module.exports.run = async (bot, message, msgArray, con) => {
	if(!msgArray[1]) return
	if(message.content.includes("'")||message.content.includes(";")) return
	
	id = bot.findEmote(msgArray, message, 1)
	if(!id) return message.reply("Couldn't find any emotes")
	
	message.reply(bot.emojis.cache.get(id).createdAt.toGMTString())
}

module.exports.name = "added"