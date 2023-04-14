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
		if(cmd.minPerms) for(let i = 0; i < cmd.minPerms.length; ++i) if(!messageCreate.member.permissions.has(cmd.minPerms[i])) {
			let MissingPermissionName = PermissionList[cmd.minPerms[i]]
			if(Array.isArray(cmd.minPerms[i])) {
				let MissingPermissionName = ""
				for(let perArray = 0; perArray < cmd.minPerms[i].length; ++perArray) {
					let MissingPermissionNameFromAndLogic = PermissionList[cmd.minPerms[i][perArray]]
					MissingPermissionName + `\`${MissingPermissionNameFromAndLogic}\``
					if(cmd.minPerms[i][perArray + 1]) MissingPermissionName + ", "
				}
			}
			return messageCreate.channel.send(`${reject.UserFault.privilege.MissingPermissions} ${MissingPermissionName}`)
		}
		if(args[0] === "-h") return messageCreate.channel.send(cmd.utilisation)
		if(NewUser !== "SentNewUserMessage") bot.utils.get("newuser").execute(bot, messageCreate, args)
		if(cmd.category === "creator" && !Bot.OwnerID.includes(messageCreate.author.id)) return messageCreate.channel.send(reject.UserFault.privilege.CreatorOnly)
		cmd.execute(bot, messageCreate, args, prefix)
		await db.add(`cmdsRan_${messageCreate.author.id}`, 1)
		.catch((error) => {
			console.error(error)
			return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
		})
	} catch(e) {
		console.log("Oh shit!")
		console.error(error)
		return messageCreate.channel.send(reject.WeAreScrewed.ExecutionError)
	}
}
