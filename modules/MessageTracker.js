module.exports.init = async (bot, con) => {
	bot.on("message", async (message) => {
		if(message.author.id == bot.user.id) return
		let msgArray = message.content.split(" ")
		
		for(i=0;i<msgArray.length;i++) {
		if(msgArray[i].startsWith("<:")||msgArray[i].startsWith("<a:") && msgArray[i].endsWith(">")) {
				if(!msgArray[i].endsWith(">")) return
				if(msgArray[i].includes("'")||msgArray[i].includes(";")) return
				id = msgArray[i].slice(-19,-1)
				
				con.query(`SELECT * FROM emotes WHERE id = '${id}'`, (err,rows) => {
					if(err) throw err
					if(rows.length < 1) {
						con.query(`INSERT IGNORE INTO emotes (id, uses, messages, reacts) VALUES ('${id}', 1, 1, 0)`)
					} else {
						con.query(`UPDATE emotes SET uses = ${rows[0].uses+1} WHERE id = '${id}'`)
						con.query(`UPDATE emotes SET messages = ${rows[0].messages+1} WHERE id = '${id}'`)
					}
				})
				break
			}
		}
	})
}

module.exports.details = {
	"title": "Message Emote Tracker",
	"description": "Tracks emotes sent in messages. Built-in.",
	"version": "1.0.0",
	"enabled": true
}