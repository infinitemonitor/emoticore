module.exports.run = async (bot, message, msgArray, con) => {
	if(!msgArray[1]) return
		
	id = bot.findEmote(msgArray, message, 1)
	if(!id) return message.reply("Couldn't find any emotes")
	
	t = bot.emojis.cache.get(id)
	
	message.reply(t ? t.url : `https://cdn.discordapp.com/emojis/${id}.${msgArray[1].startsWith("<a:") ? "gif" : "png"}`)
}

module.exports.name = "em"