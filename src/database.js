import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err))