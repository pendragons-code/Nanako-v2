const osUtils = require("node-os-utils")
async function returnUsage() {
	// made this a function because there will also be a command using this as well!
	let coreCount = osUtils.cpu.count()
	let usage = await osUtils.cpu.usage()
	let driveInfo = await osUtils.drive.info()
	let memoryInfo = await osUtils.mem.info()
	let netWork = await osUtils.netstat.stats()
	let toRenderOnPara = `coreCount: ${JSON.stringify(coreCount)}<br>usage: ${JSON.stringify(usage)}%<br><br>memoryInfo: <br>${JSON.stringify(memoryInfo)}<br><br>driveInfo: <br>${JSON.stringify(driveInfo)}<br><br>netWork: <br>${JSON.stringify(netWork)}`
	return toRenderOnPara.replaceAll(",", "<br>"). replaceAll("{", "").replaceAll("}", "").replaceAll("[", ""). replaceAll("]", "").replaceAll(":", ": ")
}
module.exports = { returnUsage }
