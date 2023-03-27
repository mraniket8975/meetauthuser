const mongoose = require('mongoose')
require('dotenv').config()

let params = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
mongoose.connect('mongodb+srv://aniket123:dyL0u7eGwuthc6J8@cluster0.7gys0dg.mongodb.net/meet?retryWrites=true&w=majority' , params)

let db  = mongoose.connection;


module.exports = db;
