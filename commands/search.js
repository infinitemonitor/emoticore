module.exports.run = async (bot, message, msgArray, con) => {
	if(!msgArray[1]) return
		
	q = msgArray[1]
	results = msgArray[2] == "-g" ? message.guild.emojis.cache.filter(x => x.name.toLowerCase().includes(q)) : bot.emojis.cache.filter(x => x.name.toLowerCase().includes(q))
	bot.emojis.cache.filter(x => x.name.toLowerCase().includes(q))
	if(!results.first()) return message.reply("Nothing found...")
	arr = results.keyArray()
	
	str = "Found some emotes:\n"
	for(i=0;i<15;i++) {
		if(!results.get(arr[i])) break
		str += `${bot.resolveEmoteTagFromId(results.get(arr[i]).id)} | ${results.get(arr[i]).name}\n`
	}
	if(results.size > 15) str += `+${results.size-15} more emotes`
	message.reply(str)
}

module.exports.name = "search"