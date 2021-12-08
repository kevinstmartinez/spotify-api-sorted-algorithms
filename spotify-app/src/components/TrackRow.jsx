import React from 'react'
import { useState, useEffect } from 'react'
import "./styles/TrackRow.css"
import axios from 'axios'
import moment from 'moment'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'


function TrackRow() {
    const [tracks, setTracks] = useState([])

    const handleTime = (minutes) => moment().startOf('day').add(minutes, 'minutes').format('m:ss')

    useEffect(async () => {
        const data = await axios.get('http://localhost:9000/api/tracks')
        setTracks(data.data.Tracks)

    }, [])

    return (
        <div className="trackRow">
            {
                tracks.map(item => {
                    return (
                        <>
                            <div className="card" >
                                <a href={item.url}><img className="trackRow__album" src={item.album} alt="" /></a>
                                <div className="trackRow__info">
                                    <h1>{item.name}</h1>
                                    <p>{item.artists} {handleTime(item.duration)}</p>
                                    {
                                        item.popularity > 40
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

export default TrackRow