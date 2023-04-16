const { returnUsage } = require("../functions/usage.js")
module.exports = {
	name: "refreshUsage",
	async execute(Input, socket, io) {
		socket.emit("refreshUsage", await returnUsage())
	}
}
