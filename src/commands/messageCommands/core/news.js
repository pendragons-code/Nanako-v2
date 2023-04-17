const { EmbedBuilder } = require("discord.js")
const { Bot, Default } = require("../../../../configs/config.json")
const reject = require("../../../../assets/general/rejection.json")
const emoji = require("../../../../assets/general/emoji.json")
module.exports = {
	name: "news",
	aliases: ["changelogs"],
	category: "core",
	utilisation:"news",
	desc: "Fetches list of changes and fixes!",
	async execute(bot, messageCreate, args, prefix) {
		let changeLogs = `Rebuilt and Revamp ${emoji.Still.Nanako.thumbsup}!\n\n\n[Fixes]:\n\n[1]: Optimized Bot\n[2]: Fixed Dead Links.\n`
		let changeLogEmbed = new EmbedBuilder()
		changeLogEmbed.setURL(Bot.Site)
		changeLogEmbed.setColor(Default.defaultEmbedColor)
		changeLogEmbed.setFooter({ text: Default.defaultFooterText })
		changeLogEmbed.setTitle(`Change logs for ${Bot.version} ${emoji.Still.Nanako.blank}!`)
		changeLogEmbed.setDescription(changeLogs)
		changeLogEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [changeLogEmbed] })
	}
}
