const osUtils = require("node-os-utils")
const emoji = require("../../assets/general/emoji.json")
async function returnUsage(state) {
	let coreCount = osUtils.cpu.count()
	let usage = await osUtils.cpu.usage()
	let driveInfo = await osUtils.drive.info()
	let memoryInfo = await osUtils.mem.info()
	let netWork = await osUtils.netstat.stats()
	uptimeInSeconds = parseInt(osUtils.os.uptime(), 10)
	let uptimeDay = Math.floor(uptimeInSeconds / (3600 * 24))
	uptimeInSeconds -= uptimeDay * 3600 * 24
	let uptimeHour = Math.floor(uptimeInSeconds / 3600)
	uptimeInSeconds -= uptimeHour * 3600
	let uptimeMinutes = Math.floor(uptimeInSeconds / 60)
	uptimeInSeconds -= uptimeMinutes * 60
	// I should honestly be using modulus more
	// Issue: the uptime here refers to the server uptime, not the node uptime.
	// That said, I will push for nodemon and other stuff too!
	let uptimeFinal = `${uptimeDay} Day(s), ${uptimeHour} Hour(s), ${uptimeMinutes} Minute(s), ${uptimeInSeconds} Second(s)`
	if(state === "siteRender") {
		let toRenderOnPara = `coreCount: ${JSON.stringify(coreCount)}<br>usage: ${JSON.stringify(usage)}%<br><br>memoryInfo: <br>${JSON.stringify(memoryInfo)}<br><br>driveInfo: <br>${JSON.stringify(driveInfo)}<br><br>netWork: <br>${JSON.stringify(netWork)}<br><br>uptime: <br>${uptimeFinal}`
		return toRenderOnPara.replaceAll(",", "<br>"). replaceAll("{", "").replaceAll("}", "").replaceAll("[", ""). replaceAll("]", "").replaceAll(":", ": ")
	}
	return `${emoji.Still.Nanako.panic} Core Counts: ${coreCount}\n${emoji.Still.Nanako.eh} CPU Usage: ${usage}%\n${emoji.Still.Nanako.heh} Memory Usage: ${100 - memoryInfo.freeMemPercentage}%\n\n${emoji.Still.Nanako.smirk2} uptime: ${uptimeFinal}`
}
module.exports = { returnUsage }
