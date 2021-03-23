module.exports.init = (bot, con, discord) => {
	Emotes = []
	Users = []
	
	con.query("SELECT * FROM emotes", (err, rows) => {
		for(item of rows) {
			Emotes.push({
				"id": item.id,
				"uses": item.uses,
				"messages": item.messages,
				"reacts": item.reacts
			})
		}
		console.log("[DBManager] Emote table cache built")
	})
	
	con.query("SELECT * FROM users", (err, rows) => {
		for(item of rows) {
			Users.push({
				"id": item.id,
				"rsent": item.rsent,
				"rrecv": item.rrecv
			})
		}
		console.log("[DBManager] User table cache built")
	})
}

module.exports.GetEmote = (id) => {
	if(id == "*") return Emotes
	return Emotes.filter(r => r.id == id)[0]||null
}

module.exports.GetUser = (id) => {
	if(id == "*") return Users
	return Users.filter(r => r.id == id)[0]||null
}

module.exports.BumpEmote = (id, property, con) => {
	let index = Emotes.findIndex(x => x.id = id)
	
	switch(property) {
		case "uses":
			Emotes[index].uses++
			con.query(`UPDATE emotes SET uses = ${Emotes[index].uses} WHERE id = '${id}'`)
			break
		case "messages":
			Emotes[index].messages++
			con.query(`UPDATE emotes SET messages = ${Emotes[index].messages} WHERE id = '${id}'`)
			break
		case "reacts":
			Emotes[index].reacts++
			con.query(`UPDATE emotes SET reacts = ${Emotes[index].reacts} WHERE id = '${id}'`)
			break
		default:
			return
	}
}

module.exports.BumpUser = (id, property, con) => {
	let index = Users.findIndex(x => x.id = id)
	
	switch(property) {
		case "rsent":
			Users[index].rsent++
			con.query(`UPDATE users SET rsent = ${Users[index].rsent} WHERE id = '${id}'`)
			break
		case "rrecv":
			Users[index].rrecv++
			con.query(`UPDATE users SET rrecv = ${Users[index].rrecv} WHERE id = '${id}'`)
			break
		default:
			return
	}
}

module.exports.AddEmote = (properties, con) => {
	Emotes.push({
		"id": properties.id,
		"uses": properties.uses,
		"messages": properties.messages,
		"reacts": properties.reacts
	})
	
	con.query(`INSERT IGNORE INTO emotes (id, uses, messages, reacts) VALUES ('${properties.id}', ${properties.uses}, ${properties.messages}, ${properties.reacts})`)
}

module.exports.AddUser = (properties, con) => {
	Users.push({
		"id": properties.id,
		"rsent": properties.rsent,
		"rrecv": properties.rrecv
	})
	
	con.query(`INSERT IGNORE INTO users (id, rrecv, rsent) VALUES ('${properties.id}', ${properties.rrecv}, ${properties.rsent})`)
}

module.exports.details = {
	"title": "DBManager",
	"description": "Handles database functions. Built-in.",
	"version": "1.0.0",
	"enabled": true
}