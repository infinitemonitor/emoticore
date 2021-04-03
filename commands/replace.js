module.exports.run = async (bot, message, msgArray, con) => {
	if(!message.member.hasPermission("MANAGE_EMOJIS")) return
	nf = require("node-fetch")
	
	toReplace = bot.findEmote(msgArray, message, 1)
	if(!message.guild.emojis.cache.get(toReplace)) return message.reply(":nah:")
	
	//figure out what to fetch
	target = null
	id = bot.findEmote(msgArray, message, 2);
	if(id && msgArray[2]) target = `https://cdn.discordapp.com/emojis/${id}.${msgArray[2].startsWith("<a:") ? "gif" : "png"}`; // name and external emote
	else if(message.attachments.first()) target = message.attachments.first().url //the first attachment of the message?
	else if(!message.attachments.first() && !msgArray[2].startsWith("<")) target = msgArray[2] //a link?
	
	old = await message.guild.emojis.cache.get(toReplace).delete()
	
	nf(target)
	.then(x => x.buffer())
	.then(buffer => {if(buffer.length > 256000) return message.reply("Source image is too large!"); message.guild.emojis.create(buffer, msgArray[3]||old.name).then(em => {if(!em) return; message.reply(`Emote <${em.animated ? "a" : ""}:${em.name}:${em.id}> replaced`)})})
}

module.exports.name = "replace"