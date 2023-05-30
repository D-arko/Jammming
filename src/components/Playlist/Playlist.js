import React, { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import SearchResults from '../SearchResults/SearchResults';

function Playlist(props) {
  const [usersPlaylist, setUsersPlaylist] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState(props.playlistName);

  function addSongHandler(songName) {
    if (!usersPlaylist.includes(songName)) {
      setUsersPlaylist([...usersPlaylist, songName]);
      console.log(`New song: ${songName} added to playlist!`);
    }
  }
  
  function removeSongHandler(songName) {
    if (usersPlaylist.includes(songName)) {
      setUsersPlaylist(usersPlaylist.filter(element => element !== songName));
      console.log(`Song: ${songName} removed from the playlist!`);
    }
  }
    
  useEffect(() => {
    console.log(`Here is the updated playlist: ${usersPlaylist}`);
  }, [usersPlaylist]);

  function handlePlaylistTitleChange(event) {
    setPlaylistTitle(event.target.value);
  }

  const savePlaylist = () => {
    const spotifyURIs = usersPlaylist.map(track => {
      // Replace 'generateSpotifyURI' with the logic to generate the actual Spotify URI for each track
      return generateSpotifyURI(track);
    });

    // Simulate saving to Spotify API
    saveToSpotifyAPI(spotifyURIs);

    // Reset the playlist in the web app
    setUsersPlaylist([]);
  };

  const generateSpotifyURI = (track) => {
    // Replace with logic to generate the actual Spotify URI for the track
    return 'spotify:track:' + track;
  };

  const saveToSpotifyAPI = (spotifyURIs) => {
    // Replace with logic to save the playlist to the user's Spotify account using the Spotify API
    console.log('Saving playlist to Spotify:', spotifyURIs);
    // Simulate success
    console.log('Playlist saved successfully!');
  };

  return (
    <>
      <input type="text" value={playlistTitle} onChange={handlePlaylistTitleChange}></input>

      <p>{props.playlistTracks}</p>
      <button type="submit" onClick={savePlaylist}>Save to Spotify</button>
      <SearchResults onAddSong={addSongHandler} onRemoveSong={removeSongHandler} />
      <Tracklist playlistName={props.playlistName} />
    </>
  );
}

export default Playlist;
