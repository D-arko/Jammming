import React, { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import SearchResults from '../SearchResults/SearchResults';

function Playlist(props) {
  const [usersPlaylist, setUsersPlaylist] = useState([]);
  const song = 'newsong';

  function addSongHandler(songName) {
    setUsersPlaylist([...usersPlaylist, songName]);
    console.log(`New song: ${songName} added to playlist!`);
  }

  return (
    <>
      <p>{props.playlistName}</p>
      <p>{props.playlistTracks}</p>
      <button type="submit">Save to Spotify</button>
      <SearchResults onAddSong={addSongHandler} />
      <Tracklist playlistName={props.playlistName} />
    </>
  );
}

export default Playlist;
