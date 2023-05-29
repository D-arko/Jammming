import React, { useState, useEffect } from "react";

function Tracklist({ playlistName, playlistTracks }) {
    const [name, setName] = useState(playlistName);
    const [tracks, setTracks] = useState(playlistTracks);

    return (
        <>
        <p>{name}</p>
        <p>{tracks}</p>
        </>
    );
}

export default Tracklist;