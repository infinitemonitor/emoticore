module.exports.run = async (bot, message, msgArray, con) => {
	if(message.channel.recipient) return
	tiers = [50,100,150,250]
	g = bot.guilds.cache.get(message.guild.id)
	gTier = tiers[g.premiumTier]
	
	message.channel.send(`**${g.emojis.cache.size}/${gTier*2} emotes**\n	Static: ${g.emojis.cache.filter(e => !e.animated).size}/${gTier} (${gTier-g.emojis.cache.filter(e => !e.animated).size} free)\n	Animated: ${g.emojis.cache.filter(e => e.animated).size}/${gTier} (${gTier-g.emojis.cache.filter(e => e.animated).size} free)\n**${g.name}** has +${gTier-50} extra emote slots thanks to ${g.premiumSubscriptionCount} boosters`)
}

module.exports.name = "slots"