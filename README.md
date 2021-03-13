# Emoticore
Discord bot for emote usage tracking

# Info
Emoticore is a bot that helps with tracking emote usage. It also tracks how many reactions users receive/send so that your server can compete to be on the #1 spot!

# Usage
- Create an SQL database
- Run the queries inside of sql_setup.txt
- In the config, set `owner` and `ownerId` to your Discord tag and your Discord user ID respectively
- Set `token` to the token of the bot you wish to host Emoticore on
- Set `sql.database` to your SQL database's name and `sql.password` to your SQL password
- Install discord.js, mysql, node-fetch and nodemon
- Run the bot

# Known issues
- Ratelimits are global which might lead to confusion if the bot is used on multiple servers. To avoid this, set `timeout` to 0 in the config

# Config values
- logReactions - whether or not to log reactions to the console. does not affect ghost reaction logging
- allowEval - toggle the eval and query commands
- prefix - the prefix of the bot
- timeout - ratelimit length in milliseconds
- recentExpiresAfter - how long it takes for reactions to no longer be considered "recent" in milliseconds
- owner - the bot owner's id
- ownerTag - the bot owner's tag
- helpLink - the link given to the user when running the help command
- token - the bot's token

# Thanks
Thanks to wurzt#0001 for coming up with the name
