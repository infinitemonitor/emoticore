module.exports.run = async (bot, message, msgArray, con) => {
	if(!message.member.hasPermission("MANAGE_EMOJIS")) return
	nf = require("node-fetch")
		
	//figure out what to fetch
	target = null
	id = bot.findEmote(msgArray, message, 2);
	if(id && msgArray[2]) target = `https://cdn.discordapp.com/emojis/${id}.${msgArray[2].startsWith("<a:") ? "gif" : "png"}`; // name and external emote
	else if(message.attachments.first()) target = message.attachments.first().url //the first attachment of the message?
	else if(!message.attachments.first() && !msgArray[2].startsWith("<")) target = msgArray[2] //a link?
	
	nf(target)
	.then(x => x.buffer())
	.then(buffer => {if(buffer.length > 256000) return message.reply("Source image is too large!"); message.guild.emojis.create(buffer, msgArray[1]||message.attachments.first().name.split(".")[0]).then(em => {if(!em) return; message.reply(`Emote <${em.animated ? "a" : ""}:${em.name}:${em.id}> created`)})})
}

module.exports.name = "add"