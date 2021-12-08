import React from 'react'
import { useState, useEffect } from 'react'
import './styles/TrackNumber.css'
import axios from 'axios'

function TrackNumber() {
  const [trackNumber, setTrackNumber] = useState([])


  useEffect(async () => {
    const data = await axios.get('http://localhost:9000/api/track-number')
    setTrackNumber(data.data.Tracks)
  }, [])
  return (
    <div className="trackNumber">
    {
      trackNumber.map(item => {
        return (
          <>
            <div className="card" key={item._id}>
              <a href={item.url}><img className="trackNumber__album" src={item.album} alt="" /></a>
              <div className="trackNumber__info">
                <h1>{item.name}</h1>
                <p>{item.artists}</p>
              </div>
            </div>
          </>
        )
      })
    }
  </div>
  )
}

export default TrackNumber
