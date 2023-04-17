const { returnUsage } = require("../../functions/usage.js")
module.exports = {
	name: "/",
	async execute(req, res) {
		let usageToDisplay = await returnUsage("siteRender")
		res.render("index.ejs", { usage: usageToDisplay })
	}
}
