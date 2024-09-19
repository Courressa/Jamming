import React, {useState} from "react";
import styles from "./Tracklist.module.css";

function Tracklist(props) {
  return (
    <div className={styles.eachSong}>
      <h2>{props.songObject.name}</h2>
      <h3>{props.songObject.artist}</h3>
      {props.children}
    </div>
  );
};

export {Tracklist};