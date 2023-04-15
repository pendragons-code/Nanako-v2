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
