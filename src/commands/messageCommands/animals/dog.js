const { EmbedBuilder } = require("discord.js")
const { getRedditResult } = require("../../../functions/redditScrape.js")
const { Default } = require("../../../../configs/config.json")
const reject = require("../../../../assets/general/rejection.json")
module.exports = {
	name: "dog",
	aliases: ["dogpic"],
	category: "animals",
	utilisation: "dog",
	desc: "Sends a pic of dogs from some related subs.",
	async execute(bot, messageCreate, args, prefix) {
		let subreddits = ["PuppySmiles", "DogPics"]
		let DogEmbed = new EmbedBuilder()
		let scrapePostData = await getRedditResult(subreddits)
		if(scrapePostData === "error") {
			console.error(messageCreate.content)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		}
		DogEmbed.setTitle(scrapePostData.title)
		DogEmbed.setURL(scrapePostData.url)
		DogEmbed.setColor(Default.defaultEmbedColor)
		DogEmbed.setFooter({ text: `👍 ${scrapePostData.up} 💬 ${scrapePostData.num_comments}` })
		DogEmbed.setImage(scrapePostData.permalink)
		DogEmbed.setTimestamp()
		return messageCreate.channel.send({ embeds: [DogEmbed] })
	}
}
