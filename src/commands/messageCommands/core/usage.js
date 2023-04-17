const { returnUsage } = require("../../../functions/usage.js")
const { EmbedBuilder } = require("discord.js")
const { Default, Bot } = require("../../../../configs/config.json")
module.exports = {
	name: "usage",
	aliases: ["-u", "--fetch"],
	category: "core",
	utilisation: "usage",
	desc: "Shows the current resource usage for the bot!",
	async execute(bot, messageCreate, args) {
		let usageEmbed = new EmbedBuilder()
		usageEmbed.setDescription(await returnUsage)
		usageEmbed.setTitle("Nanako's resources!")
		usageEmbed.setFooter({ text: Default.defaultFooterText })
		usageEmbed.setColor(Default.defaultEmbedColor)
		usageEmbed.setURL(Bot.Site)
		usageEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [usageEmbed] })
	}
}
