const discord = require("discord.js")
const mysql = require('mysql')
const fs = require("fs")
var bot = new discord.Client()
bot.cfg = require("./config.json")
var con = mysql.createConnection({
  host: bot.cfg.sql.host,
  user: bot.cfg.sql.user,
  password: bot.cfg.sql.password,
  database: bot.cfg.sql.database
})
prefix = bot.cfg.prefix
timeout = bot.cfg.timeout

lastcommand = Date.now()
recent = []
scoreCache = []

//LOAD COMMANDS
bot.commands = new discord.Collection()
fs.readdir("./commands/", (err, files) => {
	if(err) throw err;
	console.log(`Loading ${files.length} commands...`)
	ignored = 0
	
	if(files.length == 0) return console.log("No commands found")
	files.forEach((f, i) => {
		cmd = require(`./commands/${f}`)
		if(!bot.cfg.disabledCommands.includes(cmd.name)) {
			bot.commands.set(cmd.name, cmd)
		} else {
			ignored++
		}
	})
	console.log(`Commands loaded (${ignored} ignored)`)
})

//LOAD MODULES
bot.modules = new discord.Collection()
fs.readdir("./modules/", (err, files) => {
	if(err) throw err;
	console.log(`Loading ${files.length} modules...`)
	
	if(files.length == 0) return console.log("No modules found")
	files.forEach((f, i) => {
		m = require(`./modules/${f}`)
		if(m.details.enabled) {m.init(bot, con, discord); bot.modules.set(m.details.title, m)}
	})
	console.log(`${bot.modules.size} modules loaded: ${bot.modules.map(x => x.details.title).join(", ")}`)
})

con.connect(err => {if(err) throw err; console.log("Connected to database")})

bot.on("ready", async () => {
	console.log("Ready")
	let link = await bot.generateInvite({"permissions": ["SEND_MESSAGES","MANAGE_EMOJIS"]})
	console.log(link)
	
	con.query("SELECT * FROM users", (err,rows) => {
		console.log(`Calulating scores for ${rows.length} users`)
		for(user of rows) {
			scoreCache.push({
				'id': user.id,
				'score': Math.round((user.rsent/2)+user.rrecv)
			})
		}
		console.log(`Finished calculating ${rows.length} scores`)
	})
})

bot.resolveEmoteTagFromId = function(id) {
	emote = bot.emojis.cache.filter(x => x.id == id).first()
	if(!emote) return "Unavailable Emote"
	return `<${emote.animated ? "a" : ""}:${emote.name}:${id}>`
}

bot.resolveUserFromId = function(id) {
	return `<@${id}>`
}

bot.updateScoreCache = function(id, score) {
	if(scoreCache.filter(x => x.id == id)[0]) {
		scoreCache.filter(x => x.id == id)[0].score = score
	} else {
		scoreCache.push({
			'id': id,
			'score': score
		})
	}
}

bot.findEmote = function(msgArray, message, index) {
	if(!msgArray[index]) return
	let emoteRegexMatches = msgArray[index].match(/^<(a?):([A-Za-z0-9_]+):([0-9]{17,})>$/);
	if (emoteRegexMatches) {
		id = emoteRegexMatches[3];
		
		if(!id) return
		if(isNaN(id)) return
		return id
	} else if(message.guild.emojis.cache.filter(x => x.name == msgArray[index])) {
		if(!message.guild.emojis.cache.filter(x => x.name == msgArray[index]).first()) return
		id = message.guild.emojis.cache.filter(x => x.name == msgArray[index]).first().id
		return id
	} else return
}

bot.calculateScore = function(rsent, rrecv) {
	return Math.round((rsent/2)+rrecv)
}

bot.on("message", async (message) => {
	if(message.author.id == bot.user.id) return
	let msgArray = message.content.split(" ")
	
	for(i=0;i<msgArray.length;i++) {
		if(msgArray[i].startsWith("<:")||msgArray[i].startsWith("<a:") && msgArray[i].endsWith(">")) {
			if(!msgArray[i].endsWith(">")) return
			if(msgArray[i].includes("'")||msgArray[i].includes(";")) return
			id = msgArray[i].slice(-19,-1)
			
			con.query(`SELECT * FROM emotes WHERE id = '${id}'`, (err,rows) => {
				if(err) throw err
				if(rows.length < 1) {
					con.query(`INSERT IGNORE INTO emotes (id, uses, messages, reacts) VALUES ('${id}', 1, 1, 0)`)
				} else {
					con.query(`UPDATE emotes SET uses = ${rows[0].uses+1} WHERE id = '${id}'`)
					con.query(`UPDATE emotes SET messages = ${rows[0].messages+1} WHERE id = '${id}'`)
				}
			})
			break
		}
	}
	
	if(msgArray[0].startsWith(bot.cfg.prefix)) {
		let cmd = bot.commands.get(msgArray[0].slice(bot.cfg.prefix.length))
		if(cmd) cmd.run(bot, message, msgArray, con, discord)
	}
})

bot.login(bot.cfg.token); //log in with the token