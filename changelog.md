# 1.8
- Added the database manager
- Added database caching
- Updated modules and commands to utilize it

# 1.7
- Cleaned up the command list page
- (Re-)added ratelimiting, and this time it works better.
- Added Modules and converted some features to modules.
- Added package-lock.json
- Added the disabledCommands propery to config, wich allows you to disable commands.
- Added the command handler and converted all the commands to the new system.

# 1.6
- findEmote() now uses regex (thanks to nununoisy) and is generally improved
- ++add now supports adding from custom emotes
- ++add will now use the name of an attachment if no name is provided
- ++unused, which allows you to get a list of unused emotes in your server

# 1.5.2
- added helpLink property to config
- help command now gives a link to the command list page by default

# 1.5.1
- fixed bug that allowed users to set the log channel to another server's channels
- bot properly responds if no emotes are found

# 1.5
- emote management commands
- ++add, ++rename, ++remove
- currently in a very early state, might be buggy
- added recentExpiresAfter property to config
- ++slots, allows you to check how many emote slots your guild has
- other small improvements

# 1.4.1
- ++stats now supports user IDs
- score leaderboards

# 1.4
- bug fixes
- ++stats now includes position on leaderboards
- ++eval can now be disabled
- reaction logging can now be disabled
- bot owner tag no longer hard-coded
- default cooldown changed from 1250 to 500

# 1.3.3
- gave the ++uses and ++stats commands a new look

# 1.3.2
- ++stats now autofills usernames
- optimized the random emote command

# 1.3.1
- ++uses now includes position on leaderboards

# 1.3
- bot will only count the first emote in a message
- info commands
- emote search command
- emote link command
- eval command

# 1.2
- bot ignores messages from itself
- added pages to leaderboards
- added ghost reaction logging
- cleaned up help command

# 1.1
- ratelimiting
- added leaderoards
- added random emote command
- added random user command
- ++uses now supports animated emotes
- bot now tracks animated emotes
- reactions are now logged to the console

# 1.0
- added basic logging features
- added user and emote stats
- intital release
