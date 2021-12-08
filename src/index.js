import express from 'express'
import morgan from 'morgan'
import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import './database'
import getTracksPlaylist from './routes/tracks.routes'
import mostPopularSongs from './routes/tracks.routes'
import mostDurationSong from './routes/tracks.routes'
import orderByPopularSongs from './routes/tracks.routes'
import orderByMostDurationSongs from './routes/tracks.routes'

const router = express.Router()
const app = express()
const port = 9000 || process.env.PORT

let allowedOrigins = ['http://localhost:3000']
app.use(cors({
  origin: function(origin, callback){

    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, ACCESS_TOKEN } = process.env
let spotify = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
})


router.get('/', (req, res, next) => {
  res.redirect(spotify.createAuthorizeURL([
    'playlist-modify-private',
    'user-read-playback-state',
    'user-read-recently-played'
  ]))
})

// router.get('/callback', (req, res, next) =>{
//   console.log('Query', req.query)
//   const code = req.query.code
//   spotify.authorizationCodeGrant(code)
//   .then(response => {
//     res.json(JSON.stringify(response))
//     // spotify.setAccessToken(ACCESS_TOKEN)
//   })
//   console.log('code', code)
// })

spotify.setAccessToken(ACCESS_TOKEN)
const getMe = () => {
  spotify.getMe()
    .then(function (data) {
      console.log('Some information about the authenticated user', data.body);
    }, function (err) {
      console.log('Something went wrong!', err);
    });
}
const getPlaylist = async () => {
  const data = await spotify.getUserPlaylists('22a5ppdmmhkpxsypdak4p6fna')
  for (let index = 0; index < data.body.items.length; index++) {
    console.log('data', data.body.items[index].id, data.body.items[index].name)
  }
}

const getPlaylistTracks = () => {
  spotify
    .getPlaylistTracks('3AlEMT0TJiYD9TTkYgLe8q', {
      offset: 1137,
      limit: 100,
      fields: 'items'
    })
    .then(
      function (data) {
        let tracks = []
        const response = data.body.items
        for (let index = 0; index < response.length; ++index) {
          tracks.push(
            {
              album: response[index].track.album.images[0].url,
              name: response[index].track.name,
              popularity: response[index].track.popularity,
              duration: (response[index].track.duration_ms / 60000).toFixed(1), //2.70
              trackNumber: response[index].track.track_number,
              artists: response[index].track.artists[0].name,
              url: response[index].track.external_urls.spotify
            }
          )
        }
        console.log(JSON.stringify(tracks))

      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
}
//getMe()
//getPlaylist()
//getPlaylistTracks()

app.use(morgan('dev'))
app.use(express.json())
app.use('/', router)

app.use('/api/', getTracksPlaylist)
app.use('/api/', mostPopularSongs)
app.use('/api/', mostDurationSong)
app.use('/api/', orderByPopularSongs)
app.use('/api/', orderByMostDurationSongs)

app.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})

/**Sort By popularity and Duration ms */