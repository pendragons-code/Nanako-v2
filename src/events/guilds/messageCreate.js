const { db } = require("../../loaders/database.js")
const { Default, Bot } = require("../../../configs/config.json")
const reject = require("../../../assets/general/rejection.json")
module.exports = async (bot, messageCreate) => {
	if(messageCreate.content.includes(process.env.token)) bot.utils.get("tokenSecurity").execute(bot, messageCreate)
	if(messageCreate.channel.type === "dm" || messageCreate.author.bot || !messageCreate.guild.id) return
	const editmode = await db.get("editmode")
	const blacklist = await db.get(`blacklisted_${messageCreate.author.id}`)
	if(editmode !== null && !Bot.OwnerID.includes(messageCreate.authod.id)) return messageCreate.channel.send(reject.BotDownTime.editmode)
	if(blacklist !== null) return messageCreate.channel.send(reject.UserFault.privilege.BlackListedUser)
	let NewUser = await db.get(`NewUser_${messageCreate.author.id}`)
	let dbPrefix = await db.get(`prefix_${messageCreate.guild.id}`)
	let prefix = messageCreate.content.includes(dbPrefix) ? dbPrefix : `<@${Bot.Bot.ID}.`
	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase
	const cmd = bot.messageCommands.get(command) || bot.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
	if(cmd) return
	try {
		const commandDisable = await db.get(`disabledCommand_${messageCreate.guild.id}_${cmd.name}`)
		const categoryDisable = await db.get(`disabledCategory_${messageCreate.guild.id}_${cmd.category}`)
		if(commandDisable === "disabled" || categoryDisable === "disabled") return messageCreate.channel.send(reject.UserFault.privilege.DisabledCommand)
		if(cmd.maxArgs) if(args[maxArgs + 1]) return messageCreate.channel.send(reject.UserFault.args.tooMany)
	} catch(e) {
	}
}
