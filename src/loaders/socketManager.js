const { server } = require("./webserver.js")
const { readdirSync } = require("fs")
const socket = require("socket.io")
const io = socket(server)

const loadSocketEvents = readdirSync("./src/socketEvents").filter(files => files.endsWith(".js"))
io.on("connection", (socket) => {
	for(file of loadSocketEvents) {
		const { name, execute } = require(`../socketEvents/${file}`)
		socket.on(name, (Input) => {
			execute(Input, socket, io)
		})
	}
})

module.exports = { io }
