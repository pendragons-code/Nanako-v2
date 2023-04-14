const { EmbedBuilder } = require("discord.js")
const { Bot } = require("../../../configs/config.json")
module.exports = {
	name: "tokenSecurity",
	async execute(bot, messageCreate, args) {
		const embed = new EmbedBuilder()
		embed.setTitle("OH HELL NO! TOKEN STOLEN!!!")
		embed.setDescription(`message author id: ${messageCreate.author.id}\nmessage author name: ${messageCreate.author.tag}\nguild id: ${messageCreate.guild.id}\nguild name: ${messageCreate.guild.name}\nguild id: ${messageCreate.guild.id}\n message content: ${messageCreate.content}`)
		return bot.users.cache.get(Bot.BotOwnerID).send({ embeds: [embed] })
		.catch((error) => {
			console.error(error)
			return console.log("TOKEN COMPROMISED!")
		})

		// Will explore the ideas of the following:
		// triggering lockdown mode, no commands are allowed to be used
		// checking for every messageContent that was not sent by this instance with a message explaining that the bot has been compromised.
		// alert owner via pings and dms
		// log all servers and owners and leaving the servers
		// lockdown mode should also be applied to jasbot if successful
	}
}
