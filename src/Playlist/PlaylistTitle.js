import React, { useState, useEffect } from "react";
import styles from "../Song&Icon Styles/List.module.css";

function PlaylistTitle({sendCollectPing, collectName}) {
    const [title, setTitle] = useState("");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    useEffect(() => {
        if (sendCollectPing) {
            collectName(title);
        }
    }, [sendCollectPing]);

    return (
        <div>
            <form>
                <input 
                    aria-label="Playlist Name"
                    name="PlaylistTitle"
                    value={title}
                    onChange={handleTitleChange}
                    className={styles.playlistName}
                    type="text"
                    placeholder="Playlist Name"
                />
            </form>
        </div>
    )
};

export {PlaylistTitle};