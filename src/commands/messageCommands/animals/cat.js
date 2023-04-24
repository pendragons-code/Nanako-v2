const { EmbedBuilder } = require("discord.js")
const { Default } = require("../../../../configs/config.json")
const axios = require("axios")
module.exports = {
	name: "cat",
	aliases: ["catpic"],
	category: "animals",
	utilisation: "cat",
	desc: "Sends a pic of cats from some related subs.",
	async execute(bot, messageCreate, args) {
		let subreddits = ["Catloaf", "tuckedinkittens", "cats", "blep"]
		let subredditToScrape = subreddits[Math.floor(Math.random() * subreddits.length)]
		const catEmbed = new EmbedBuilder()
		let scrapePost = axios({
			method: "GET",
			url: `https://www.reddit.com/r/${subredditToScrape}/random/.json`,
		})
		let scrapePostData = scrapePost.data[0].data.children.data
		catEmbed.setTitle(scrapePostData.title)
		catEmbed.setURL(scrapePostData.url)
		catEmbed.setColor(Default.defaultEmbedColor)
		catEmbed.setFooter({ text: `👍 ${scrapePostData.up} 💬 ${scrapePostData.num_comments}` })
		catEmbed.setImage(scrapePostData.permalink)
		catEmbed.setTimestamp()
		// Will probably make a function for this.
		return messageCreate.channel.send({ embeds: [catEmbed] })
	}
}
