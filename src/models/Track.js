import { Schema, model } from 'mongoose'


const trackSchema = new Schema({
  album: String,
  name: String,
  popularity: Number,
  duration: Number,
  trackNumber: Number,
  artists: String,
  url: String 
})

module.exports = model('Track', trackSchema) 
