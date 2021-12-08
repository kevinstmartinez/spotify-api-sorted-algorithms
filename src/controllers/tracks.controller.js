
import '../database'
import Track from '../models/Track'

const getTracksPlaylist = async (req, res) => {
  const tracks = await Track.find()
  res.status(200).json({ Tracks: tracks })
}

const mostPopularSongs = async (req, res) => {
  console.time('Time bubble-sort')
  const tracks = await Track.find()
  let len = tracks.length
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len - i - 1; ++j) {
      if (tracks[j].popularity < tracks[j + 1].popularity) {
        let temp = tracks[j]
        tracks[j] = tracks[j + 1]
        tracks[j + 1] = temp
      }
    }
  }
  console.timeEnd('Time bubble-sort')
  return res.status(200).json({ Tracks: tracks })
}

const mostDurationSong = async (req, res) => {
  console.time('Time selection-sort')
  const tracks = await Track.find()
  let n = tracks.length

  for (let i = 0; i < n; ++i) {
    let min = i
    for (let j = i + 1; j < n; ++j) {
      if (tracks[j].duration > tracks[min].duration) {
        min = j
      }
    }
    if (min != i) {
      let tmp = tracks[i]
      tracks[i] = tracks[min]
      tracks[min] = tmp
    }
  }
  console.timeEnd('Time selection-sort')
  return res.status(200).json({ Tracks: tracks })

}

const mostNumberOfTrack = async (req, res) => {
  console.time('Time insert-sort')
  const tracks = await Track.find()
  let n = tracks.length

  for (let i = 1; i < n; ++i) {
    for (let j = i - 1; j > -1; --j) {
      if (tracks[j + 1].trackNumber < tracks[j].trackNumber) {
        [tracks[j + 1], tracks[j]] = [tracks[j], tracks[j + 1]]

      }
    }
  }

  console.timeEnd('Time insert-sort')
  return res.status(200).json({ Tracks: tracks })
}

const orderByPopularSongs = async (req, res) => {
  const { dataNumber, steps } = req.body

  const tracks = await Track.find().limit(dataNumber)

  if (dataNumber > tracks.length) return res.status(400).json({ message: 'the number entered exceeds the number of data' })
  if (steps > 50) return res.status(400).json({ message: 'Exced bounds, enter number in the allowed range ' })


  let times = []
  let len = tracks.length
  let index = 1
  let t0 = performance.now()
  while (index <= steps) {
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len - i - 1; ++j) {
        if (tracks[j].popularity < tracks[j + 1].popularity) {
          let temp = tracks[j]
          tracks[j] = tracks[j + 1]
          tracks[j + 1] = temp
        }
      }
    }

    ++index
    let t1 = performance.now()
    times.push(t1 - t0)
  }

  return res.status(200).json({ TimingBubbleSort: times, Tracks: tracks })
}

const orderByMostDurationSongs = async (req, res) => {
  const { dataNumber, steps } = req.body
  const tracks = await Track.find().limit(dataNumber)
  let times = []
  let index = 1
  let n = tracks.length

  if (dataNumber > tracks.length) return res.status(400).json({ message: 'the number entered exceeds the number of data' })
  if (steps > 50) return res.status(400).json({ message: 'Exced bounds, enter number in the allowed range ' })


  let t0 = performance.now()
  while (index <= steps) {
    for (let i = 0; i < n; ++i) {
      let min = i
      for (let j = i + 1; j < n; ++j) {
        if (tracks[j].duration > tracks[min].duration) {
          min = j
        }
      }
      if (min != i) {
        let tmp = tracks[i]
        tracks[i] = tracks[min]
        tracks[min] = tmp
      }
    }
    ++index
    let t1 = performance.now()
    times.push(t1 - t0)
  }
  return res.status(200).json({ TimingSelectionSort: times, Tracks: tracks })
}

const orderByTrackNumber = async (req, res) => {
  const { dataNumber, steps } = req.body
  const tracks = await Track.find().limit(dataNumber)
  let times = []
  let index = 1
  let n = tracks.length

  if (dataNumber > tracks.length) return res.status(400).json({ message: 'the number entered exceeds the number of data' })
  if (steps > 50) return res.status(400).json({ message: 'Exced bounds, enter number in the allowed range ' })


  let t0 = performance.now()
  while (index <= steps) {
    for (let i = 1; i < n; ++i) {
      for (let j = i - 1; j > -1; --j) {
        if (tracks[j + 1].trackNumber < tracks[j].trackNumber) {
          [tracks[j + 1], tracks[j]] = [tracks[j], tracks[j + 1]]

        }
      }
    }

    ++index
    let t1 = performance.now()
    times.push(t1 - t0)
  }

  return res.status(200).json({ TimingInsertSort: times, Tracks: tracks })

}

module.exports = {
  getTracksPlaylist,
  mostPopularSongs,
  mostDurationSong,
  orderByPopularSongs,
  orderByMostDurationSongs,
  orderByTrackNumber,
  mostNumberOfTrack
}
