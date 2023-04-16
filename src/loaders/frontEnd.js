const { readdirSync } = require("fs")
const express = require("express")
const routeFrontEnd = express.Router()
const { rateLimit } = require("express-rate-limit")
const { windowMinutes, maxWindowRequest, standardHeaders, legacyHeaders, message } = require("../../configs/rateLimit.json")

const limiter = rateLimit({
	windowMs: windowMinutes * 60000,
	max: maxWindowRequest,
	standardHeaders: standardHeaders,
	legacyHeaders: legacyHeaders,
	message: message
})

routeFrontEnd.use(limiter)
const loadFrontEndFile = readdirSync("./src/frontEnd/PageLoader").filter(files => files.endsWith(".js"))
for(file of loadFrontEndFile) {
	const { execute, name } = require(`../frontEnd/PageLoader/${file}`)
	routeFrontEnd.get(`/${name}`, async (req, res) => {
		execute(req, res)
	})
}

module.exports = routeFrontEnd
