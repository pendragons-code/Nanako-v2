const { Bot, Default } = require("../../../../configs/config.json")
const { EmbedBuilder } = require("discord.js")
const emote = require("../../../../assets/general/emoji.json")
const reject = require("../../../../assets/general/rejection.json")
module.exports = {
	name: "link",
	aliases: [],
	category: "core",
	utilisation: "link <dm/here>",
	desc: "Sends links to add the discord bot!",
	async execute(bot, messageCreate, args, prefix) {
		let LinkEmbed = new EmbedBuilder()
		LinkEmbed.setTitle("Link to add the bot!")
		LinkEmbed.setURL(Bot.Site)
		LinkEmbed.setColor(Default.defaultEmbedColor)
		LinkEmbed.setFooter({ text: Default.defaultFooterText })
		LinkEmbed.setTimestamp()
		LinkEmbed.setDescription(`Thank you very much for using this bot! Please do consider adding me! ${emote.Still.Nanako.embarassed2}`)
		if(!args[0] || args[0] !== "dm") return messageCreate.channel.send({ embeds: [LinkEmbed] })
		return messageCreate.authod.send({ embeds: [LinkEmbed] })
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content) // honestly should console.error this as well!
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	}
}
