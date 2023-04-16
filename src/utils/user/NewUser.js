const { EmbedBuilder } = require("discord.js")
const reject = require("../../../assets/general/rejection.json")
const { db } = require("../../loaders/database.js")
const { Default } = require("../../../configs/config.json")
module.exports = {
	name: "NewUser",
	async execute(bot, messageCreate, args) {
		const NewUserEmbed = new EmbedBuilder()
		NewUserEmbed.setTitle("Hello there new user!")
		NewUserEmbed.setDescription(`Hey there! I noticed that this is your first time using me (the discord bot, what were you thinking ba- baka??? (〃3〃))! Tsundere jokes aside, you seeing this message means that this is a form notification that you made your first interaction with the bot! It is also our responsibility to ensure that nothing bad happens to you through Nanako! If there are any problems contact us through discord! To see whats new and what was fixed, try the "nanako news" command, if you want to change the prefix, you can do so using "<old prefix> prefix <new prefix>"! Finally, I would like to give you a word of thanks for trying the bot out! Thank you!`)
		NewUserEmbed.setTimestamp()
		NewUserEmbed.setColor(Default.DefaultEmbedColor)
		NewUserEmbed.setFooter({ text: "Hello there! Pls do tell us how we can improve!" })
		await db.set(`NewUser_${messageCreate.author.id}`, "SentNewUserMessage")
		.catch((error) => {
			console.error(error)
			console.log(messageCreate.content)
			return
		})
		return messageCreate.reply({ embeds: [NewUserEmbed] })
	}
}
