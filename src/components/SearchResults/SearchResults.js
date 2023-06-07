import React from 'react';

function SearchResults(props) {
  return (
    <>
      {props.searchResults.map(track => (
        <div key={track.id}>
        <button onClick={() => props.onAddSong(track)}>+</button><strong>{track.name}</strong> by {track.artist}
        <p>Album: {track.album}</p>
        <p>URI: {track.uri}</p>
        </div>
      ))}
    </>
  );
}

export default SearchResults;
