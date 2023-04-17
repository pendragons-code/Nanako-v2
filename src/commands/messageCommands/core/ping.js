const emoji = require("../../../../assets/general/emoji.json") // Will be trying to stick to emoji since emote is a type of feature.
module.exports = {
	name: "ping",
	aliases: [],
	category: "core",
	utilisation: "ping",
	desc: "Shows latency between the bot and discord.",
	async execute(bot, messageCreate, args, prefix) {
		messageCreate.channel.send(`${emoji.Still.Nanako.blank} - Ping: **${bot.ws.ping}ms**!`)
	}
}
