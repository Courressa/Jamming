import React from "react";

function Track(props) {

    return (
        <div>
            <button>Plus</button>
            <h2>{props.name}</h2>
            <h3>{props.songArtist}</h3>
            <h3>{props.songAlbum}</h3>
        </div>
    );
};

export {Track};