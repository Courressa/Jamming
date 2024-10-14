import React from "react";
import styles from "./Track.module.css";

function Track(props) {
    let showImage;
    if (props.songAlbum) {
        showImage = <img src={props.songImage} alt={`Artist ${props.songArtist}'s album`} aria-label="album image"/>;
    }

    const handleListenOnSpotify = () => {
        window.open(`${props.songOnSpitfyLink}`,'_blank');
    };
    

    return (
        <div className={styles.moreInfo}>
            <h2>{props.name}</h2>
            {showImage}
            <h3>Artist: {props.songArtist}</h3>
            <h3>Album: {props.songAlbum}</h3>
            <h3>Popularity: {props.songPopularity}/100</h3>
            <button
                onClick={handleListenOnSpotify}
            >
                Listen On Spotify
            </button>
        </div>
    );
};

export {Track};