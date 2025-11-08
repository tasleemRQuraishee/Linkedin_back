const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 4000
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/linkedin_clone'

mongoose
  .connect(MONGO)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error', err)
  })
