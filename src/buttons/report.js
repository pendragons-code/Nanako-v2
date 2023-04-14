const { EmbedBuiler } = require("discord.js")
const { Bot, Default } = require("../../configs/config.json")
module.exports = async ({ bot, interactionCreate }) => {
	const embed = new EmbedBuiler()
	embed.setDescription("Report errors dierctly to PENDRAGON#8785!")
	embed.setTimestamp()
	embed.setURL(Bot.Site)
	embed.setFooter({ text: Default.DefaultFooterText })
	embed.setColor(Default.DefaultEmbedColor)
	return interactionCreate.reply({ embeds: [embed] })
}
