const { EmbedBuilder } = require("discord.js")
const { Bot, Default } = require("../../../../configs/config.json")
module.exports = {
	name: "help",
	aliases: [],
	category: "core",
	desc: "A command that sends info about other commands!",
	utilisation: "help / help <category/command>",
	async execute(bot, messageCreate, args, prefix) {
		const commander = bot.messageCommands.filter(x => x)
		const commanderCategory = bot.messageCommands.map(u => u.category)
		const categoryArray = []
		for(const CategoryName of commanderCategory) {
			if(!categoryArray.includes(CategoryName)) categoryArray.push(CategoryName)
		}
		let helpEmbed = new EmbedBuilder()
		helpEmbed.setTitle("˜”*°•.˜”*°• Nanako bot's help list! •°*”˜.•°*”˜")
		helpEmbed.setDescription(`Prefix is **${prefix}**, Senryuu Shoujo best manga!\n This bot has a total of ${commander.size} commands!`)
		helpEmbed.setFooter({ text: Default.defaultFooterText })
		helpEmbed.setColor(Default.defaultEmbedColor)
		helpEmbed.setURL(Bot.Site)
		helpEmbed.setTimestamp()
		if(!args[0]) {
			helpEmbed.addFields(
				{ name: "Available categories!", value: "`" + prefix + "help <category>`\n\n`" + categoryArray.join("`, `") + "`", inline: true }
			)
			return messageCreate.channel.send({ embeds: [helpEmbed] })
		}
		if(categoryArray.includes(args[0])) {
			let categorySpecificCommands = bot.messageCommands.filter(commands => commands.category === args[0])
			helpEmbed.addFields({ name: "Available Commands!", value: "`" + categorySpecificCommands.map(cmd => cmd.name).join("`, `") + "`", inline: true })
			return messageCreate.channel.send({ embeds: [helpEmbed] })
		}

		const searchCommand = bot.messageCommands.get(args.join(" ").toLowerCase()) || bot.messageCommands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()))
		if(!searchCommand) return messageCreate.channel.send("I did not find this command!")
		helpEmbed.addFields(
			{ name: "Name", value: searchCommand.name, inline: true },
			{ name: "Category", value: searchCommand.category, inline: true },
			{ name: "Alias(es)", value: searchCommand.aliases.length < 1 ? "None" : searchCommand.aliases.join(", "), inline: true },
			{ name: "Utilisation", value: searchCommand.utilisation, inline: true },
			{ name: "Description", value: searchCommand.desc }
		)
		return messageCreate.channel.send({ embeds: [helpEmbed] })
	}
}
