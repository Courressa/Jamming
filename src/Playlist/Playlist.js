import React from "react";
import styles from "../Song&Icon Styles/List.module.css";
import "../Song&Icon Styles/ButtonIcons.css";

function Playlist(props) {
    
    const handleRemoval = (event) => {
        props.remove(event.target.value);
        props.collectRemoval(event.target.value);
        
    };

    return (
        <div className={styles.eachSong}>
            <section>
                <h2>{props.listObject.name}</h2>
                <h3>{props.listObject.artist}</h3>
            </section>
            <section>
                <button
                    className="material-symbols-outlined"
                    onClick={handleRemoval}
                    value={props.listObject.id}
                >close</button>
            </section>
        </div>
    );
};

export {Playlist};