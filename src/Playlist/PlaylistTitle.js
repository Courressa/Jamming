import React, { useState, useEffect } from "react";
import styles from "../Song&Icon Styles/List.module.css";

function PlaylistTitle(props) {
    const [title, setTitle] = useState("Playlist Name");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    useEffect(() => {
        if (props.sendCollectPing) {
            props.collectName(title);
        }
    }, [props.sendCollectPing]);

    
    

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