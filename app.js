const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Express
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

// Database
const { connection } = require('./config/connection')
connection()

// Routes
const userRoutes = require('./routes/userRoute')
const postRoutes = require('./routes/postRoute')

app.use('/api/v1', userRoutes)
app.use('/api/v1', postRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
