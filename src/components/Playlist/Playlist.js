import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';

function Playlist(props) {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [usersPlaylistTracks, setUsersPlaylistTracks] = useState(null);
  const [accessToken, setAccessToken] = useState([]);
  const [usersPlaylistUrl, setusersPlaylistUrl] = useState('');
  const [snapshotId, setSnapshotId] = useState('');

  function handlePlaylistTitleChange(event) {
    setPlaylistTitle(event.target.value);
    
    fetch(usersPlaylistUrl, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'applicaiton/json'
      },
      body: JSON.stringify({
        name: playlistTitle
      })
      });
  }
  
  function addSongHandler(track) {
      const isTrackInPlaylist = usersPlaylistTracks.some(
      (playlistTrack) => playlistTrack.uri === track.uri
    );

    if (isTrackInPlaylist) {
      window.alert('Song already in the playlist!');
      console.log('Track already in the list');
    } else {
      fetch(usersPlaylistUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: [
              track.uri
            ],
            position: 0
        })})
      .then(response => {
        if (response.ok) {
          const updatedPlaylist = usersPlaylistTracks.push(track);
          setUsersPlaylistTracks(updatedPlaylist);
          getTracksFromPlaylist();
          console.log(`Track added to the playlist successfully.`);
          return response.json();
        } else {
          throw new Error(`Failed to add track ${track} to the playlist.`);
        }
      })
      .then(data => {
        setSnapshotId(data.snapshot_id);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  
  function removeSongHandler(trackUri) {
    fetch(usersPlaylistUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tracks: [
          {
            uri: trackUri
          }
        ],
        snapshot_id: snapshotId
      })
  })
    .then(response => {
      if (response.ok) {
        const updatedPlaylist = usersPlaylistTracks.filter(track => track.uri !== trackUri);
        setUsersPlaylistTracks(updatedPlaylist);
        console.log('Song removed from the playlist successfully.');
        return response.json();
      } else {
        throw new Error('Failed to remove the song from the playlist.');
      }
    })
    .then(data => {
      setSnapshotId(data.snapshot_id);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }

  useEffect(() => {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch) {
      setAccessToken(accessTokenMatch[1]);
    }
  }, []);

  useEffect(() => {
    if (usersPlaylistUrl) {
      getTracksFromPlaylist();
    }
  }, [usersPlaylistUrl]);

function getCurrentUserPlaylist() {
    const apiUrl = 'https://api.spotify.com/v1/me/playlists';

    fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setPlaylistTitle(data.items[0].name);
      setSnapshotId(data.items[0].snapshot_id);
      setusersPlaylistUrl(data.items[0].tracks.href);
    })
    .catch(error => {
        console.log(error);
      });
   }

  function getTracksFromPlaylist() {
    fetch(usersPlaylistUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.items)) {
        const tracks = data.items.map(item => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          uri: item.track.uri
        }));
      setUsersPlaylistTracks(tracks);
    }})
    .catch(error => {
      console.log(error);
    });
  }
  
  return (
    <>
      <input type="text" value={playlistTitle} onChange={handlePlaylistTitleChange}></input>
      {Array.isArray(usersPlaylistTracks) && usersPlaylistTracks.map(track => (
        <div key={track.id}>
        <strong>{track.name}</strong> by {track.artist}<button onClick={() => removeSongHandler(track.uri)}>-</button>
        <p>Album: {track.album}</p>
        <p>URI: {track.uri}</p>
      </div>
      ))}

      <p>{props.playlistTracks}</p>
      <button onClick={getCurrentUserPlaylist}>Get Playlist</button>
      <SearchBar onAddSong={addSongHandler} onRemoveSong={removeSongHandler} />
    </>
  );
}

export default Playlist;