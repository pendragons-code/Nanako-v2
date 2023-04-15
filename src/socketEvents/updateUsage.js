const osUtils = require("node-os-utils")
module.exports = {
	name: "refreshUsage",
	async execute(Input, socket, io) {
		// I will just leave input empty since it has no use here.
		let coreCount = osUtils.cpu.count()
		let usage = await osUtils.cpu.usage() // instead of getting how much is free by fetching it, im just gonna subtract it on the front end.
		let driveInfo = await osUtils.drive.info()
		let memoryInfo = await osUtils.mem.info()
		let netWork = await osUtils.netstat.stats()
		socket.emit({
			coreCount: coreCount,
			usage: usage,
			driveInfo: driveInfo,
			memoryInfo: memoryInfo,
			netWork: netWork
		})
	}
}
