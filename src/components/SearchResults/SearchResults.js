import React from 'react';

// const songName1 = 'song1';
// const songName2 = 'song2';
// const songName3 = 'song3';

function SearchResults(props) {
  function handleClick(songName) {
    props.onAddSong(songName);
  }

  return (
    <>
      <button onClick={() => handleClick(props.songName1)}>{props.songName1}</button>
      <a href="#">{props.songName1}</a>
      <button onClick={() => handleClick(props.songName2)}>{props.songName2}</button>
      <a href="#">{props.songName2}</a>
      <button onClick={() => handleClick(props.songName3)}>{props.songName3}</button>
      <a href="#">{props.songName3}</a>
    </>
  );
}

export default SearchResults;
