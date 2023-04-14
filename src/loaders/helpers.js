const { bot } = require("./bot.js")
const { readdirSync } = require("fs")
async function loadHelper() {
	console.log("Helpers:")
	let loadHelperDirs = await readdirSync("./src/helpers/").filter(dirs => dirs)
	for (dirs of loadHelperDirs) {
		const helper = readdirSync(`./src/helpers/${dirs}`).filter(file => file.endsWith(".js"))
		for(file of helper) {
			require(`../helpers/${dirs}/${file}`)(bot)
			console.log(`Loading Helper: ${file} from ${dirs} succeeded!`)
			delete require.cache[require.resolve(`../helpers/${dirs}/${file}`)]
		}
	}
}
module.exports = { loadHelper }
