const axios = require("axios")
async function getRedditResult(arrayOfSubreddits) {
	let subredditToScrape = arrayOfSubreddits[Math.floor(Math.random() * arrayOfSubreddits.length)]
	let scrapePost = axios({
		method: "GET",
		url: `https://www.reddit.com/r/${subredditToScrape}/random/.json`
	})
	if(!scrapePost) return "error"
	let scrapePostData = scrapePost.data[0].data.children.data
	return scrapePostData
}

module.exports = { getRedditResult }
