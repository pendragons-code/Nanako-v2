const { EmbedBuilder } = require("discord.js")
const { getRedditResult } = require("../../../functions/redditScrape.js")
const { Default } = require("../../../../configs/config.json")
const reject = require("../../../../assets/general/rejection.json")
module.exports = {
	name: "duck",
	aliases: ["duckpic"],
	category: "animals",
	utilisation: "duck",
	desc: "Sends a pic of ducks from some related subs.",
	async execute(bot, messageCreate, args, prefix) {
		let subreddits = ["duckpics"]
		let DuckEmbed = new EmbedBuilder()
		let scrapePostData = await getRedditResult(subreddits)
		if(scrapePostData === "error") {
			console.error(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		}
		DuckEmbed.setTitle(scrapePostData.title)
		DuckEmbed.setURL(scrapePostData.url)
		DuckEmbed.setColor(Default.defaultEmbedColor)
		DuckEmbed.setFooter({ text: `👍 ${scrapePostData.up} 💬 ${scrapePostData.num_comments}` })
		DuckEmbed.setImage(scrapePostData.permalink)
		DuckEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [DogEmbed] })
	}
}
