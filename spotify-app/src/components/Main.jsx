import React from 'react'
import Sidebar from './Sidebar'
import './styles/Main.css'
import TrackRow from './TrackRow'
import TrackPopular from './TrackPopular'
import TrackDuration from './TrackDuration'
import TrackNumber from './TrackNumber'
import Chart from './Chart'
import { BrowserRouter, Route } from 'react-router-dom'

function Main() {
  
  return (
    <BrowserRouter>
      <div className="content">
        <Sidebar />
        <Route path='/home' exact component={TrackRow} />
        <Route path='/library' exact component={TrackRow} />
        <Route path='/popular' component={TrackPopular} />
        <Route path='/duration' component={TrackDuration} />
        <Route path='/track-number' component={TrackNumber} />
        <Route path='/chart-popular' component={Chart} />
      </div>
    </BrowserRouter>
  )


}
export default Main