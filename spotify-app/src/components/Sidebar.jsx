import React from 'react'
import "./styles/Sidebar.css"
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import StarIcon from '@material-ui/icons/Star';
import TimelineIcon from '@material-ui/icons/Timeline'
import MoreTimeIcon from '@material-ui/icons/AccessTime'
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { Link } from 'react-router-dom'

function Sidebar() {
    return (

        <div className="sidebar">
            <img className="sidebar__logo" src="https://download.logo.wine/logo/Spotify/Spotify-Logo.wine.png" alt="" />

            <Link className="link" to="/home">
                <SidebarOption Icon={HomeIcon} title="Home" />
            </Link>
            <br />
            <Link className="link" to="/library">
                <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
            </Link>
            <br />
            <Link className="link" to="/popular">
                <SidebarOption Icon={StarIcon} title="Most Popular (Bubble Sort)" />
            </Link>
            <br />
            <Link className="link" to="/duration">
                <SidebarOption Icon={MoreTimeIcon} title="Most Duration (Selection Sort)" />
            </Link>
            <br />
            <Link className="link" to="/track-number">
                <SidebarOption Icon={QueueMusicIcon} title="Most Duration (Insertion Sort)" />
            </Link>
            <br />
            <Link className="link" to="/chart-popular">
                <SidebarOption Icon={TimelineIcon} title="Chart" />
            </Link>
            <hr />
        </div>
    )
}

export default Sidebar