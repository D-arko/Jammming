import React, { useState, useEffect } from 'react';
import SearchResults from '../SearchResults/SearchResults';

function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function SearchBar(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  function handleLogin() {
    var clientId = 'b4ee7b6e5728412384b03566fd5e7955';
    var redirectUri = 'http://localhost:3000';

    var state = generateRandomString(16);
    var stateKey = 'spotify_auth_state';

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  
  }
  useEffect(() => {
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

  if (accessTokenMatch) {
    setAccessToken(accessTokenMatch[1]);
  }
}, []);

  const searchSpotify = (query) => {
    if (query === '') {
      setSearchResults([]);
      return;
    }

    const apiUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}&limit=5`;

    fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(response => response.json())
      .then(data => {
        const tracks = data.tracks.items.map(item => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri
        }));
        setSearchResults(tracks);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => searchSpotify(event.target.value)}
        />
      <button onClick={handleLogin}>Log in with Spotify</button>
      <SearchResults searchResults={searchResults} onAddSong={props.onAddSong} onRemoveSong={props.onRemoveSong} />
    </div>
  );
}

export default SearchBar;
