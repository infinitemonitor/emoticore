module.exports.run = async (bot, message, msgArray, con) => {
	target = bot.users.cache.filter(x => x.tag.toLowerCase().startsWith(msgArray.slice(1).join(" "))).first()||message.mentions.users.first()||{'id': msgArray[1]}
	if(!msgArray[1]) target = message.author
	
	con.query(`SELECT * FROM users`, (err,rows) => {
		row = rows.filter(x => x.id == target.id)[0]
		if(!row) return message.reply("No users found")
		
		rsentSorted = rows.sort(function(a, b) {return a.rsent - b.rsent})
		rsentSorted.reverse()
		rsentPos = rsentSorted.indexOf(row)+1
	
		rrecvSorted = rows.sort(function(a, b) {return a.rrecv - b.rrecv})
		rrecvSorted.reverse()
		rrecvPos = rrecvSorted.indexOf(row)+1
		
		user = bot.users.cache.get(target.id)
		message.reply(`**${user ? user.tag : msgArray[1]}**\n🔹 **Score:** ${bot.calculateScore(row.rsent, row.rrecv)}\n📤 **Reactions sent:** ${row.rsent} (#${rsentPos})\n📥 **Reactions received:** ${row.rrecv} (#${rrecvPos})`)
	})
	return
}

module.exports.name = "stats"