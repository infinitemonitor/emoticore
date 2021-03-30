module.exports.init = async (bot, con) => {
	timeout = bot.cfg.timeout
	owner = bot.cfg.owner
	users = []
}

module.exports.ProcessRatelimit = (id) => {
	if(id == owner) return
	if(!users.filter(x => x.id == id)[0]) {
		users.push({"id": id, "lastAction": Date.now()})
		setTimeout(() => {users.splice(users.findIndex(x => x.id == id),1)}, timeout)
		return false
	} else {
		if(Date.now() - users.filter(x => x.id == id)[0].lastAction < timeout) return true
	}
}

module.exports.details = {
	"title": "Ratelimiter",
	"description": "Handles ratelimits.",
	"version": "1.0.0",
	"enabled": true
}