import React from "react";

function Playlist(props) {
    
    /*selectedSongs.map((song) => (
                <h2>{song.name}<br /> {song.artist}</h2>
            ))*/
    return (
        <div>
            <h2>{props.listObject.name}</h2>
            <h3>{props.listObject.artist}</h3>
        </div>
    );
};

export {Playlist};