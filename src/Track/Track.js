import React from "react";

function Track(props) {

    return (
        <div>
            <h2>{props.name}</h2>
            <h3>Artist: {props.songArtist}</h3>
            <h3>Album: {props.songAlbum}</h3>
        </div>
    );
};

export {Track};