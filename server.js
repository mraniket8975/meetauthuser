const express   = require('express')
const cors = require('cors')
const routes = require('./routes')
const db = require('./connection')

const app = express()
app.use(routes)
app.use(express.json())
app.use(cors)




app.listen(7777 , () => console.log(`server started at 7777`))
