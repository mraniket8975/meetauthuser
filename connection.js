const mongoose = require('mongoose')
require('dotenv').config()
let url = process.env.MONGO_URL
let params = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
mongoose.connect(url , params)

let db  = mongoose.connection;


module.exports = db;