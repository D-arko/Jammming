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
