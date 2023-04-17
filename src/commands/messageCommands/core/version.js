const { Bot } = require("../../../../configs/config.json")
const emoji = require("../../../../assets/general/emoji.json")
module.exports = {
	name: "version",
	aliases: ["--v", "-v"], // because that idiot insisted
	category: "core",
	utilisation: "version",
	desc: "Shows you the current version of the bot!",
	async execute(bot, messageCreate, args, prefix) {
		return messageCreate.channel.send(`My current version is ${Bot.version}! ${emoji.Still.Nanako.smile}`)
	}
}
