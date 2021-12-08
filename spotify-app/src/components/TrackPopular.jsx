import React from 'react'
import { useState, useEffect } from 'react'
import './styles/TrackPopular.css'
import axios from 'axios'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'


function TrackPopular() {
  const [popular, setPopular] = useState([])

  useEffect(async () => {
    const data = await axios.get('http://localhost:9000/api/popular')
    setPopular(data.data.Tracks)
  }, [])
  return (
    <div className="trackPopular">
      {
        popular.map(item => {
          return (
            <>
              <div className="card" >
                <a href={item.url}><img className="trackPopular__album" src={item.album} alt="" /></a>
                <div className="trackPopular__info">
                  <h1>{item.name}</h1>
                  <p>{item.artists}</p>
                  {
                    item.popularity > 35  
                      ? <p className="up">{item.popularity} <ArrowDropUp /></p>
                      : <p className="down">{item.popularity} <ArrowDropDown /></p>
                  }
                </div>
              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default TrackPopular
