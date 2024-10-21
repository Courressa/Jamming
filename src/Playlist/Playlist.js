import React from "react";
import styles from "../Song&Icon Styles/List.module.css";
import "../Song&Icon Styles/ButtonIcons.css";

function Playlist(props) {
    
    const handleRemoval = (event) => {
        props.remove(event.target.value);
        props.collectRemoval(event.target.value);
        props.collectCount();
    };

    const displaysArtists = (
        props.listObject.artists.map((person, index) => (
          (index ? ', ' : '') + person.name
        ))
      );

    return (
        <div className={styles.eachSong}>
            <section>
                <h2>{props.listObject.name}</h2>
                <h3>{displaysArtists}</h3>
            </section>
            <section className="close">
                <button
                    aria-label="Remove Song"
                    className="material-symbols-outlined close"
                    onClick={handleRemoval}
                    value={props.listObject.id}
                >close</button>
            </section>
        </div>
    );
};

export {Playlist};