module.exports.run = async (bot, message, msgArray, con, discord) => {
	DBM = bot.modules.get("DBManager")
	
	rows = DBM.GetUser("*")
	
	row = rows[Math.round(Math.random()*rows.length)]||rows[0]
	
	emb = new discord.MessageEmbed()
		.setDescription(`${bot.resolveUserFromId(row.id)} has received ${row.rrecv} reactions and sent ${row.rsent} reactions`)
	message.reply(emb)
}

module.exports.name = "user"