import SpotifyWebApi from 'spotify-web-api-node'
import dotenv from 'dotenv'
dotenv.config()

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env
const spotify = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
})


