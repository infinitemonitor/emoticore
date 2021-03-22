module.exports.run = async (bot, message, msgArray, con) => {
	con.query("SELECT * FROM emotes", (err, rows) => {
		gEmotes = rows.filter(x => message.guild.emojis.cache.get(x.id))
		
		gEmotes.sort(function(a, b) {return a.uses - b.uses})
		gEmotes.reverse()
		!msgArray[1] ? cutoff = Math.round(gEmotes[0].uses/150) : cutoff = msgArray[1]
		if(cutoff > 150 && msgArray[1]) return message.reply("Custom cut-off point cannot exceed 150 uses!")
		
		unused = gEmotes.filter(x => x.uses < cutoff)
		
		t = `Emotes under ${cutoff} uses: `
		for(e of unused) {
			t += bot.resolveEmoteTagFromId(e.id) + " "
			if(t.length > 1900) {message.channel.send(t); t = `(continued) `}
		}
		message.channel.send(t)
	})
}

module.exports.name = "unused"