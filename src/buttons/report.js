const { EmbedBuiler } = require("discord.js")
const { Bot, Default } = require("../../configs/config.json")
module.exports = async ({ bot, interactionCreate })=> {
	const embed = new EmbedBuiler()
	embed.setURL(Bot.Site)
}

// Nanako will not have heavy implementation of the interactions system
