import React, {useState, useEffect} from "react";
import { Playlist } from "../Playlist/Playlist";
import styles from "./Tracklist.module.css";



function Tracklist(props) {
  const [minusPlus, setMinusPlus] = useState("Plus");
  const songlist = [props.songObject]

  /*if (props.collectID) {
    for (const prop in props.songObject) {
      if (props.collectID === props.songObject[prop]) {
        console.log(song.id);
        setMinusPlus("Plus");
      }
  }*/

  useEffect(() => {
    songlist.map((song) => {
      if (song.id == props.collectID) {
        console.log(props.collectID + 'something' + props.songObject.id);
        setMinusPlus("Plus");
      }
    }, [props.collectID])
    

  });
  
  const handleToggle = (event) => {
    props.addMinus(event.target.value);

    if (minusPlus === "Plus") {
      setMinusPlus("Minus");
  } else if (minusPlus === "Minus") {
      setMinusPlus("Plus");
  }
  };

  const handleInfo = (event) => {
    props.info(event.target.value);
  };

  return (
    <div className={styles.eachSong}>
      <h2>{props.songObject.name}</h2>
      <h3>{props.songObject.artist}</h3>
      <button
        onClick={handleToggle}
        value={props.songObject.id}
      >
        {minusPlus}
      </button>
      <button
        onClick={handleInfo}
        value={props.songObject.id}
      >
        More Info
      </button>
      {props.children}
    </div>
  );
};

export {Tracklist};