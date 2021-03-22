module.exports.run = async (bot, message, msgArray, con) => {
	if(message.channel.recipient) return
	if(!msgArray[1]) return
	if(message.content.includes("'")||message.content.includes(";")) return
		
	id = bot.findEmote(msgArray, message, 1)
	if(!id) return message.reply("Couldn't find any emotes")
		
	con.query(`SELECT * FROM emotes`, (err,rows) => {
		sorted = rows.sort(function(a, b) {return a.uses - b.uses})
		sorted.reverse()
			
		row = rows.filter(x => x.id == id)[0]
			
		if(!row) return message.reply("I haven't logged that emote yet. (this likely means that it has never been used)")
		pos = sorted.indexOf(row)+1
		message.reply(`${bot.resolveEmoteTagFromId(id)} has been used ${row.uses} times. \n💬 **Messages:** ${row.messages}\n😀 **Reactions:** ${row.reacts}\n📈 **Position:** #${sorted.indexOf(row)+1}`)
	})
	return
}

module.exports.name = "uses"