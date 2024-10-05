import React, { useState } from "react";
import styles from "../Song&Icon Styles/List.module.css";

function PlaylistTitle() {
    const [title, setTitle] = useState("Playlist Name");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div>
            <form>
                <input 
                    name="PlaylistTitle"
                    value={title}
                    onChange={handleTitleChange}
                    className={styles.playlistName}
                    type="text"
                />
            </form>
        </div>
    )
};

export {PlaylistTitle};