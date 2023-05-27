import React from 'react';

import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Track from '../Track/Track.js';
import Tracklist from '../Tracklist/Tracklist.js';

// hard-coded array of tracks from Spotify
const tracks = [
    {
        name: 'song1',
        artist: 'artist1',
        album: 'album1',
        id: 1
    },
    {
        name: 'song2',
        artist: 'artist2',
        album: 'album2',
        id: 2
    },
    {
        name: 'song3',
        artist: 'artist3',
        album: 'album3',
        id: 3
    },
    {
        name: 'song4',
        artist: 'artist4',
        album: 'album4',
        id: 4
    }
];

function App() {
    return (
        <>
        <Playlist />
        <SearchBar />
        <SearchResults />
        {
            tracks.map(object => {
                return <Track
                    name={object.name}
                    artist={object.artist}
                    album={object.album}
                    id={object.id}
                    />
            })
        }
        
        <Track />
        <Tracklist />
        </>
    );    
}

export default App;