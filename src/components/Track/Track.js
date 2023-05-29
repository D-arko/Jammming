import React from 'react';

function Track({ name, artist, album, id }) {
    return (
        <>
        <p>{name}</p>
        <p>{artist}</p>
        <p>{album}</p>
        <p>{id}</p>
        </>
    );
}

export default Track;