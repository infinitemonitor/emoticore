module.exports.run = async (bot, message, msgArray, con, discord) => {
	if(!msgArray[1]) return message.reply("Which leaderboard would you like to see?\nmost-used - most used emotes\nmost-reacts-sent - most reactions sent\nmost-reacts-received - most reactions received\nscore - top user scores\ntype `++leaderboard [your choice]`")
		
	if(msgArray[1] == "most-used"||msgArray[1] == "uses") {
		//worst page system ever created by mankind
		//but it works
		start = parseInt(msgArray[2])-1||0
		start *= 5
		con.query(`SELECT * FROM emotes`, (err,rows) => {
			sorted = rows.sort(function(a, b) {return a.uses - b.uses})
			sorted.reverse()
			if(start < 0||start > sorted.length-5) return message.reply("Invalid page")
			
			str = ""
			for(i=0;i<5;i++) {
				str += `${1+(start+i)}. ${bot.resolveEmoteTagFromId(sorted[start+i].id)} | ${sorted[start+i].uses}\n`
			}
			
			emb = new discord.MessageEmbed()
				.setTitle("Global Leaderboard | Most used emotes")
				.setDescription(str)
				.setFooter(`${start+1}-${start+5} of ${sorted.length} | ++lb uses [page] to jump to page`)
			return message.reply(emb)
		})
	}
	
	if(msgArray[1] == "most-reacts-sent"||msgArray[1] == "rsent") {
		start = parseInt(msgArray[2])-1||0
		start *= 5
		con.query(`SELECT * FROM users`, (err,rows) => {
			sorted = rows.sort(function(a, b) {return a.rsent - b.rsent})
			sorted.reverse()
			if(start < 0||start > sorted.length-5) return message.reply("Invalid page")
			
			str = ""
			for(i=0;i<5;i++) {
				str += `${1+(start+i)}. ${bot.resolveUserFromId(sorted[start+i].id)} | ${sorted[start+i].rsent}\n`
			}
			
			emb = new discord.MessageEmbed()
				.setTitle("Global Leaderboard | Most reacts sent")
				.setDescription(str)
				.setFooter(`${start+1}-${start+5} of ${sorted.length} | ++lb rsent [page] to jump to page`)
			return message.reply(emb)
		})
	}
	
	if(msgArray[1] == "most-reacts-received"||msgArray[1] == "rrecv") {
	start = parseInt(msgArray[2])-1||0
		start *= 5
		con.query(`SELECT * FROM users`, (err,rows) => {
			sorted = rows.sort(function(a, b) {return a.rrecv - b.rrecv})
			sorted.reverse()
			if(start < 0||start > sorted.length-5) return message.reply("Invalid page")
			
			str = ""
			for(i=0;i<5;i++) {
				str += `${1+(start+i)}. ${bot.resolveUserFromId(sorted[start+i].id)} | ${sorted[start+i].rrecv}\n`
			}
			
			emb = new discord.MessageEmbed()
				.setTitle("Global Leaderboard | Most reacts received")
				.setDescription(str)
				.setFooter(`${start+1}-${start+5} of ${sorted.length} | ++lb rrecv [page] to jump to page`)
			return message.reply(emb)
		})
	}
	if(msgArray[1] == "score"||msgArray[1] == "sc") {
	start = parseInt(msgArray[2])-1||0
		start *= 5
		sorted = scoreCache.sort(function(a, b) {return a.score - b.score})
		sorted.reverse()
		if(start < 0||start > sorted.length-5) return message.reply("Invalid page")
			
		str = ""
		for(i=0;i<5;i++) {
			str += `${1+(start+i)}. ${bot.resolveUserFromId(sorted[start+i].id)} | ${sorted[start+i].score}\n`
		}
			
		emb = new discord.MessageEmbed()
			.setTitle("Global Leaderboard | Top scores")
			.setDescription(str)
			.setFooter(`${start+1}-${start+5} of ${sorted.length} | ++lb sc [page] to jump to page`)
		return message.reply(emb)
	}
	return
}

module.exports.name = "lb"