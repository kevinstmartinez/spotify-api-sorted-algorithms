import React from 'react'
import { useState, useEffect } from 'react'
import './styles/TrackDuration.css'
import axios from 'axios'
import moment from 'moment'

function TrackDuration() {
  const [durationTrack, setDurationTrack] = useState([])
  const handleTime = (minutes) => moment().startOf('day').add(minutes, 'minutes').format('m:ss')

  useEffect(async () => {
    const data = await axios.get('http://localhost:9000/api/duration')
    setDurationTrack(data.data.Tracks)
  }, [])
  return (
    <div className="trackDuration">
      {
        durationTrack.map(item => {
          return (
            <>
              <div className="card" >
                <a href={item.url}><img className="trackDuration__album" src={item.album} alt="" /></a>
                <div className="trackDuration__info">
                  <h1>{item.name}</h1>
                  <p>{item.artists} {handleTime(item.duration)}</p>
                </div>
              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default TrackDuration
