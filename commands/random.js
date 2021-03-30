module.exports.run = async (bot, message, msgArray, con) => {
	DBM = bot.modules.get("DBManager")
	
	row = DBM.GetEmote(bot.emojis.cache.randomKey())
	
	if(!row) return message.reply("Failed to get a random emote")
	
	message.reply(`${bot.resolveEmoteTagFromId(row.id)} has been used ${row.uses} times. \n💬 **Messages:** ${row.messages}\n😀 **Reactions:** ${row.reacts}`)
}

module.exports.name = "random"