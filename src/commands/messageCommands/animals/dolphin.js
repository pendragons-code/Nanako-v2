const { EmbedBuilder } = require("discord.js")
const { getRedditResult } = require("../../../functions/redditScrape.js")
const { Default } = require("../../../../configs/config.json")
const reject = require("../../../../assets/general/rejection.json")
module.exports = {
	name: "dolphin",
	aliases: ["dolphinpic"],
	category: "animals",
	utilisation: "dolphin",
	desc: "Sends a pic of dolphins from some related subs.",
	async execute(bot, messageCreate, args, prefix) {
		let subreddits = ["Dolphinpics"]
		let DolphinEmbed = new EmbedBuilder()
		let scrapePostData = await getRedditResult(subreddits)
		if(scrapePostData === "error") {
			console.error(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		}
		DolphinEmbed.setTitle(scrapePostData.title)
		DolphinEmbed.setURL(scrapePostData.url)
		DolphinEmbed.setColor(Default.defaultEmbedColor)
		DolphinEmbed.setFooter({ text: `👍 ${scrapePostData.up} 💬 ${scrapePostData.num_comments}` })
		DolphinEmbed.setImage(scrapePostData.permalink)
		DolphinEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [DogEmbed] })
	}
}
