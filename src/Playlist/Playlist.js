import React from "react";

function Playlist(props) {
    
    const handleRemoval = (event) => {
        let collectSelected;
        if (event.target.value == props.listObject.id) {
            collectSelected = props.listObject;
        }
        props.remove(event.target.value);
        props.collectRemoval([collectSelected], event.target.value);
        
    };

    return (
        <div>
            <h2>{props.listObject.name}</h2>
            <h3>{props.listObject.artist}</h3>
            <button
                onClick={handleRemoval}
                value={props.listObject.id}
            >X</button>
        </div>
    );
};

export {Playlist};