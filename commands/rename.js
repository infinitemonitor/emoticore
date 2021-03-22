module.exports.run = async (bot, message, msgArray, con) => {
	if(!message.member.hasPermission("MANAGE_EMOJIS")) return
	if(!msgArray[1]) return
	if(!msgArray[2]) return
		
	id = bot.findEmote(msgArray, message, 1)
	e = message.guild.emojis.cache.get(id)
	if(!e) return
		
	e.setName(msgArray[2])
	.then(em => {message.reply(`Emote <${em.animated ? "a" : ""}:${em.name}:${em.id}> renamed`)})
}

module.exports.name = "rename"