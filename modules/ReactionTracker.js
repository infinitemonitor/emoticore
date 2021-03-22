module.exports.init = async (bot, con, discord) => {
	bot.on("messageReactionAdd", async (react) => {
		if(bot.cfg.logReactions) console.log(`${react.users.cache.last().tag} reacted with ${react.emoji.name} to ${react.message.author.tag}`)
		
		//This keeps track of reactions which were added recently
		//Entries are automatically removed after 1.5 seconds
		recent.push({
			ts: Date.now(),
			user: react.users.cache.last().id,
			message: react.message.id,
			messageChannel: react.message.channel.id,
			messageGuild: react.message.guild.id,
			emoji: react.emoji.name + " | " + react.emoji.url||react.emoji.name
		})
		
		setTimeout(() => {recent.splice(recent.findIndex(x => x.ts == Date.now()),1)},bot.cfg.recentExpiresAfter)
		
		if(!react.emoji.id) return
		
		con.query(`SELECT * FROM emotes WHERE id = '${react.emoji.id}'`, (err,rows) => {
			if(err) throw err
			if(rows.length < 1) {
				con.query(`INSERT IGNORE INTO emotes (id, uses, messages, reacts) VALUES ('${react.emoji.id}', 1, 0, 1)`)
			} else {
				con.query(`UPDATE emotes SET uses = ${rows[0].uses+1} WHERE id = '${react.emoji.id}' LIMIT 1`)
				con.query(`UPDATE emotes SET reacts = ${rows[0].reacts+1} WHERE id = '${react.emoji.id}' LIMIT 1`)
			}
		})
		
		con.query(`SELECT * FROM users WHERE id = '${react.message.author.id}'`, (err,rows) => {
			if(err) throw err
			if(rows.length < 1) {
				con.query(`INSERT IGNORE INTO users (id, rrecv, rsent) VALUES ('${react.message.author.id}', 1, 0)`)
			} else {
				con.query(`UPDATE users SET rrecv = ${rows[0].rrecv+1} WHERE id = '${react.message.author.id}'`)
				bot.updateScoreCache(react.message.author.id, bot.calculateScore(rows[0].rsent, rows[0].rrecv))
			}
		})
		
		con.query(`SELECT * FROM users WHERE id = '${react.users.cache.last().id}'`, (err,rows) => {
			if(err) throw err
			if(rows.length < 1) {
				if(!react.users.cache.last()) return
				con.query(`INSERT IGNORE INTO users (id, rrecv, rsent) VALUES ('${react.users.cache.last().id}', 0, 1)`)
			} else {
				if(!react.users.cache.last()) return
				con.query(`UPDATE users SET rsent = ${rows[0].rsent+1} WHERE id = '${react.users.cache.last().id}'`)
				bot.updateScoreCache(react.users.cache.last().id, bot.calculateScore(rows[0].rsent, rows[0].rrecv))
			}
		})
	
	})

	bot.on("messageReactionRemove", async (react, user) => {
		a = recent.findIndex(x => x.message == react.message.id)
		if(!recent[a]) return
		if(user.id == recent[a].user) {
			emb = new discord.MessageEmbed()
				.setTitle("Ghost reaction caught")
				.addField("User", bot.resolveUserFromId(recent[a].user))
				.addField("Emote", recent[a].emoji)
				.addField("Message", `https://discord.com/channels/${recent[a].messageGuild}/${recent[a].messageChannel}/${recent[a].message}`)
				.setTimestamp(recent[a].ts)
				
			con.query(`SELECT * FROM settings WHERE server = '${react.message.guild.id}'`, (err,rows) => {
				if(rows.length == 0) return; 
				bot.channels.fetch(rows[0].channel).then(c => c.send(emb))
			})
		}
	})
}

module.exports.details = {
	"title": "Reaction Tracker",
	"description": "Logs reactions and catches ghost reacts. Built-in.",
	"version": "1.0.0",
	"enabled": true
}