import React, { useState, useEffect } from "react";
import styles from "../Song&Icon Styles/List.module.css";

function PlaylistTitle(props) {
    const [title, setTitle] = useState("");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    useEffect(() => {
        if (props.sendCollectPing) {
            props.collectName(title);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sendCollectPing]);

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