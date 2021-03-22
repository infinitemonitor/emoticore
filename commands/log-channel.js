module.exports.run = async (bot, message, msgArray, con) => {
	if(message.channel.recipient) return //how to check if a message is in a dm in the worst possible way
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return
	if(!message.mentions.channels.first()) return con.query(`SELECT * FROM settings WHERE server = '${message.guild.id}'`, (err,rows) => {if(rows.length > 0) {con.query(`DELETE FROM settings WHERE server = '${message.guild.id}'`); message.reply("I will no longer log events in this server.")}})
	if(!message.guild.channels.cache.get(message.mentions.channels.first().id)) return message.reply("Keep logs in your own server!")
	
	con.query(`SELECT * FROM settings WHERE server = '${message.guild.id}'`, (err,rows) => {
		if(rows.length == 0) con.query(`INSERT INTO settings (server, channel) VALUES ('${message.guild.id}', '${message.mentions.channels.first().id}')`)
		
		con.query(`UPDATE settings SET channel = ${message.mentions.channels.first().id} WHERE server = '${message.guild.id}'`)
		message.reply("Channel set! I'm sending a message to the channel to verify that it's the right one.\n\nIf no message appears, check my permissions!")
		bot.channels.fetch(message.mentions.channels.first().id).then(c => c.send("This is a test message..."))
	})
}

module.exports.name = "log-channel"