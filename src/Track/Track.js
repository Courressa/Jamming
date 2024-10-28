import React from "react";
import styles from "./Track.module.css";

function Track(props) {
    let showImage;
    if (props.songAlbum) {
        showImage = <img src={props.songImage} alt={`${props.songAlbum} Album`} />;
    }

    const handleListenOnSpotify = () => {
        window.open(`${props.songOnSpitfyLink}`,'_blank');
    };
    
    let showAudio;
    if (props.songPreview) {
        showAudio = <audio src={props.songPreview} controls aria-label="Song Preview"> Your Browser Does Not Support This Audio</audio>;
    } else {
        showAudio = "No Preview Available";
    }

    return (
        <div className={styles.moreInfo}>
            <h2>{props.name}</h2>
            {showImage}
            <h3>Artist: {props.songArtist}</h3>
            <h3>Album: {props.songAlbum}</h3>
            <h3>Popularity: {props.songPopularity}/100</h3>
            <br />
            <h3>Preview:
                <br />
                <br />
                {showAudio}
            </h3>
            <button
                onClick={handleListenOnSpotify}
            >
                Listen On Spotify
            </button>
        </div>
    );
};

export {Track};