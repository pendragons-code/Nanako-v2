const { EmbedBuilder } = require("discord.js")
const { Bot, Default } = require("../../../../configs/config.json")
const emoji = require("../../../../assets/general/emoji.json")
module.exports = {
	name: "servercount",
	aliases: ["sc"],
	category: "core",
	utilisation: "servercount",
	desc: "Show how many servers this bot is in.",
	async execute(bot, messageCreate, args, prefix) {
		let serverCountEmbed = new EmbedBuilder()
		serverCountEmbed.setTitle("Server Count!")
		serverCountEmbed.setDescription(`Listening on ${bot.guilds.cache.size} servers, for a total of ${bot.users.cache.size} users! ${emoji.Still.Nanako.blank}`)
		serverCountEmbed.setFooter({ text: Default.defaultFooterText })
		serverCountEmbed.setColor(Default.defaultEmbedColor)
		serverCountEmbed.setTimestamp()
		serverCountEmbed.setURL(Bot.Site)
		// Will consider adding links to the fandom and the other relevant site
		return messageCreate.channel.send({ embeds: [serverCountEmbed] })
	}
}
