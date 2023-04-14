const { EmbedBuiler } = require("discord.js")
const { Bot, Default } = require("../../configs/config.json")
module.exports = async ({ bot, interactionCreate })=> {
	const embed = new EmbedBuiler()
	embed.setColor(Default.DefaultEmbedColor)
	embed.setFooter({ text: Default.DefaultFooterText })
	embed.setDescription("Please add the discord bot!")
	embed.setTitle("Add link!")
	embed.setURL(Bot.Site)
	embed.addFields(
		{ name: "Bot add link", value: `[Click me!](${Bot.AddLink})` }
	)
	embed.setTimestamp()
	interactionCreate.reply({ embeds: [embed] })
}
// To update all emotes into a json file! This is because the emoji.json fileis outdated!!
// Nanako will not have heavy implementation of the interactions system
