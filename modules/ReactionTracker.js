module.exports.init = async (bot, con, discord) => {
	DBM = bot.modules.get("DBManager")
	
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
		
		if(DBM.GetEmote(react.emoji.id)) {
			DBM.BumpEmote(react.emoji.id, "uses", con)
			DBM.BumpEmote(react.emoji.id, "reacts", con)
		} else {
			DBM.AddEmote({id: react.emoji.id, uses: 1, messages: 0, reacts: 1}, con)
		}
		
		if(DBM.GetUser(react.message.author.id)) {
			DBM.BumpUser(react.message.author.id, "rrecv", con)
			bot.updateScoreCache(react.message.author.id, bot.calculateScore(DBM.GetUser(react.message.author.id).rsent, DBM.GetUser(react.message.author.id).rrecv))
		} else {
			DBM.AddUser({id: react.message.author.id, rrecv: 1, rsent: 0}, con)
		}
		
		if(DBM.GetUser(react.users.cache.last().id)) {
			DBM.BumpUser(react.users.cache.last().id, "rsent", con)
			bot.updateScoreCache(react.users.cache.last().id, bot.calculateScore(DBM.GetUser(react.users.cache.last().id).rsent, DBM.GetUser(react.users.cache.last().id).rrecv))
		} else {
			DBM.AddUser({id: react.users.cache.last().id, rrecv: 0, rsent: 1}, con)
		}
	
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