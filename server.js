const express   = require('express')
const cors = require('cors')
const routes = require('./routes')
const db = require('./connection')
const port = process.env.PORT 
const app = express()
app.use(routes)
app.use(express.json())
app.use(cors)




app.listen(port , () => console.log(`server started at ${port}`))