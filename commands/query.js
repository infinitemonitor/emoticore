module.exports.run = async (bot, message, msgArray, con) => {
	if(!bot.cfg.allowEval) return message.reply("This command is disabled")
	if(message.author.id !== bot.cfg.owner) return message.reply("Access denied")
	
	q = msgArray.slice(1).join(" ")
	
	con.query(q, (err,rows) => {
		message.reply(rows.message||`Query OK (${rows.length} rows)`)
	})
}

module.exports.name = "query"