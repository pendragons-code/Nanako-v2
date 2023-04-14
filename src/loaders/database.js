const { QuickDB } = require("quick.db")
const db = new QuickDB({ filePath: "DataBase/DataBase.sqlite" })
module.exports = { db }
