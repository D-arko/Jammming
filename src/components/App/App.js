import React, { useState } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Track from '../Track/Track.js';
import Tracklist from '../Tracklist/Tracklist.js';

// mock hard-coded array of tracks from Spotify2
const tracks = [
  {
    name: 'song1',
    artist: 'artist1',
    album: 'album1',
    id: 1,
  },
  {
    name: 'song2',
    artist: 'artist2',
    album: 'album2',
    id: 2,
  },
  {
    name: 'song3',
    artist: 'artist3',
    album: 'album3',
    id: 3,
  },
  {
    name: 'song4',
    artist: 'artist4',
    album: 'album4',
    id: 4,
  },
];

// mock playlist name and tracks
const playlistName = 'playlist1';
const playlistTracks = ['track1', 'track2', 'track3'];

// mock songs name for SearchResults
const songName1 = 'songN1';
const songName2 = 'songN2';
const songName3 = 'songN3';

  // Connecting to Spotify
var client_id = 'CLIENT_ID';
var redirect_uri = 'http://localhost:3000/callback';

var state = generateRandomString(16);



localStorage.setItem(stateKey, state);
var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

// Clear parameters from the URL
const Spotify = {
  accessToken: '',
  expiresIn: 0,

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    // Check if the access token and expiration time are in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      this.expiresIn = Number(expiresInMatch[1]);

      // Clear parameters from the URL
      window.setTimeout(() => {
        this.accessToken = '';
        this.expiresIn = 0;
        window.history.pushState('Access Token', null, '/');
      }, this.expiresIn * 1000);

      // Return the access token
      return this.accessToken;
    }

    // Redirect the user to the Spotify authorization URL if the access token is not in the URL
    const redirectUri = 'http://localhost:3000'; // Replace with your app's redirect URI
    const scopes = ['scope1', 'scope2']; // Replace with the scopes required for your app
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;

    window.location = spotifyAuthUrl;
  },

  // Use the access token to make requests to the Spotify API
  // Implement your API request logic here
  // For example:
  search(term) {
    const accessToken = this.getAccessToken();

    // Make API request using the access token
    // Replace with your actual API request implementation
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response data
        console.log(data);
      })
      .catch(error => {
        // Handle API request errors
        console.log(error);
      });
  },
};

// export default Spotify;


function App() {
  return (
    <>
      <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
      <SearchBar />
      <SearchResults
        songName1={songName1}
        songName2={songName2}
        songName3={songName3}
      />
      {tracks.map((object) => {
        return (
          <Track
            key={object.id}
            name={object.name}
            artist={object.artist}
            album={object.album}
            id={object.id}
          />
        );
      })}
      <Tracklist />
    </>
  );
}

export default App;
