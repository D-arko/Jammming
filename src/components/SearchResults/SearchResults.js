import React from 'react';

function SearchResults(props) {
  
  const songName1 = props.songName1  || "songName1";
  const songName2 = props.songName2  || "songName2";
  const songName3 = props.songName3  || "songName3";

  function handleClickAdd(songName) {
    props.onAddSong(songName);
  }

  function handleClickRemove(songName) {
    props.onRemoveSong(songName);
  }

  return (
    <>
      <button onClick={() => handleClickAdd(songName1)}>+{songName1}</button><button onClick={() => handleClickRemove(songName1)}>-remove</button>
      <button onClick={() => handleClickAdd(songName2)}>+{songName2}</button><button onClick={() => handleClickRemove(songName2)}>-remove</button>
      <button onClick={() => handleClickAdd(songName3)}>+{songName3}</button><button onClick={() => handleClickRemove(songName3)}>-remove</button>
    </>
  );
}

export default SearchResults;
