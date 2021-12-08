import express from 'express'
const router = express.Router()
import {
  getTracksPlaylist,
  mostPopularSongs,
  mostDurationSong,
  mostNumberOfTrack,
  orderByPopularSongs,
  orderByMostDurationSongs,
  orderByTrackNumber
} from '../controllers/tracks.controller'

router.get('/tracks', getTracksPlaylist)
router.get('/popular', mostPopularSongs)
router.get('/duration', mostDurationSong)
router.get('/track-number', mostNumberOfTrack)
router.post('/order-bubble', orderByPopularSongs)
router.post('/order-selection', orderByMostDurationSongs)
router.post('/order-insert', orderByTrackNumber)

module.exports = router