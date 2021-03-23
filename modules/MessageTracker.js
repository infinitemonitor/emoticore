module.exports.init = async (bot, con) => {
	DBM = bot.modules.get("DBManager")
	
	bot.on("message", async (message) => {
		if(message.author.id == bot.user.id) return
		let msgArray = message.content.split(" ")
		
		for(i=0;i<msgArray.length;i++) {
		if(msgArray[i].startsWith("<:")||msgArray[i].startsWith("<a:") && msgArray[i].endsWith(">")) {
				if(!msgArray[i].endsWith(">")) return
				if(msgArray[i].includes("'")||msgArray[i].includes(";")) return
				let id = msgArray[i].slice(-19,-1)
				
				if(DBM.GetEmote(id)){
					DBM.BumpEmote(id, "messages", con)
					DBM.BumpEmote(id, "uses", con)
				} else {
					DBM.AddEmote({id: id, uses: 1, messages: 1, reacts: 0}, con)
				}
				break
			}
		}
	})
}

module.exports.details = {
	"title": "Message Emote Tracker",
	"description": "Tracks emotes sent in messages. Built-in.",
	"version": "1.0.0",
	"enabled": true
}