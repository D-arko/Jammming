import React from 'react';
import './SearchResults.css';

function SearchResults(props) {

return (
  <div className="search-results">
    {props.searchResults.map((track) => (
      <div className="track" key={track.id}>
        <span className="track-name">{track.name}</span> -{' '}
        <span className="track-artist">{track.artist}</span>
        <button
          className="add-button"
          onClick={() => props.onAddSong(track)}
        >
          Add
        </button>
      </div>
    ))}
  </div>
);
}

export default SearchResults;
