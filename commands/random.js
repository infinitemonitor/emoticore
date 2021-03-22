module.exports.run = async (bot, message, msgArray, con) => {
	con.query(`SELECT * FROM emotes WHERE id = ${bot.emojis.cache.randomKey()}`, (err,rows) => {
		row = rows[0]
		if(!row) return message.reply("Failed to get a random emote")
		
		message.reply(`${bot.resolveEmoteTagFromId(row.id)} has been used ${row.uses} times. \n💬 **Messages:** ${row.messages}\n😀 **Reactions:** ${row.reacts}`)
	})
}

module.exports.name = "random"