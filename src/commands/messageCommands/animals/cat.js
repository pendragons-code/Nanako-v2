const { EmbedBuilder } = require("discord.js")
const { getRedditResult } = require("../../../functions/redditScrape.js")
const { Default } = require("../../../../configs/config.json")
const reject = require("../../../../assets/general/rejection.json")
module.exports = {
	name: "cat",
	aliases: ["catpic"],
	category: "animals",
	utilisation: "cat",
	desc: "Sends a pic of cats from some related subs.",
	async execute(bot, messageCreate, args, prefix) {
		let subreddits = ["Catloaf", "tuckedinkittens", "cats", "blep"]
		let catEmbed = new EmbedBuilder()
		let scrapePostData = await getRedditResult(subreddits)
		if(scrapePostData === "error") {
			console.error(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		}
		catEmbed.setTitle(scrapePostData.title)
		catEmbed.setURL(scrapePostData.url)
		catEmbed.setColor(Default.defaultEmbedColor)
		catEmbed.setFooter({ text: `👍 ${scrapePostData.up} 💬 ${scrapePostData.num_comments}` })
		catEmbed.setImage(scrapePostData.permalink)
		catEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [catEmbed] })
	}
}
