const { readdirSync } = require("fs")
const { bot } = require("./bot.js")
async function loadEvents() {
	console.log("Events:")
	const loadEventsDirs = readdirSync("./src/events").filter(dirs => dirs)
	for(dirs of loadEventsDirs) {
		const eventFile = readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"))
		for(file of eventFile) {
			const event = require(`../events/${dirs}/${file}`)
			console.log(`Loading event: ${file} from ${dirs}!`)
			bot.on(file.replace(".js", ""), event.bind(null, bot))
			delete require.cache[require.resolve(`../events/${dirs}/${file}`)]
		}
	}
}
// Might update the thing for jasbot as well
// Most of the code here is written without testing
module.exports = { loadEvents }
