const { bot } = require("./bot.js")
const { Collection } = require("discord.js")
const { readdirSync } = require("fs")

async function loadMessageCommands() {
	bot.messageCommands = new Collection()
	console.log("messageCommands:")
	let messageCommandsDirs = await readdirSync("./src/commands/messageCommands").filter(dirs => dirs)
	for(dirs of messageCommandsDirs) {
		const messageCommandFile = readdirSync(`./src/commands/messageCommands/${dirs}`)
		for (file of commandFile) {
			const command = require(`../src/commands/messageCommands/${dirs}`).filter(file => files.endsWith(".js"))
			console.log(`Loading messageCommand: ${file} from ${dirs}!`)
			bot.messageCommands.set(command.name.toLowerCase(), command)
			delete require.cache[require.resolve(`../commands/messageCommands/${dirs}/${file}`)]
		}
	}
}

module.exports = { loadMessageCommands }
