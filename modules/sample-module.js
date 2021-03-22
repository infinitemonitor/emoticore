module.exports.init = async (bot, con) => {
	bot.on("message", async (message) => {
		if(!message.mentions.users.first()) return
		if(message.mentions.users.first().id == bot.user.id) {
			console.log(`Pinged in #${message.channel.name}`)
		}
	})
}

module.exports.details = {
	"title": "Sample Module",
	"description": "A sample module. Use it to build your own, or just ignore it.",
	"version": "1.0.0",
	"enabled": false
}