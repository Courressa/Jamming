import React, {useState, useEffect} from "react";
import styles from "../Song&Icon Styles/List.module.css";
import "../Song&Icon Styles/ButtonIcons.css";



function Tracklist(props) {
  const [minusPlus, setMinusPlus] = useState("add");
  const [ariaLabel, setAriaLabel] = useState("Add Song To Playlist");
  const songlist = [props.songObject];

  //Change to plus when removed from playlist section
  useEffect(() => {
    songlist.map((song) => {
      if (song.id === props.collectID) {
        setMinusPlus("add");
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sendEffectCount]);

  //Change to plus when all songs are sent to Spotify from playlist section
  useEffect(() => {
    songlist.map((song) => {
      for (let i = 0; i < props.collectID.length; i++) {
        if (song.id === props.collectID[i]) {
          setMinusPlus("add");
        };
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collectID]);
  
  const handleToggle = (event) => {
    props.addMinus(event.target.value);

    if (minusPlus === "add") {
      setMinusPlus("remove");
      setAriaLabel("Remove Song From Playlist");
    } else if (minusPlus === "remove") {
      setMinusPlus("add");
      setAriaLabel("Add Song To Playlist");
    }
  };

  const handleInfo = (event) => {
    props.info(event.target.value);
  };

  const displaysArtists = (
    props.songObject.artists.map((person, index) => (
      (index ? ', ' : '') + person.name
    ))
  );
  

  return (
    <div className={styles.eachSong}>
      <section className={styles.titleArtist}>
        <h2>{props.songObject.name}</h2>
        <h3>{displaysArtists}</h3>
        
      </section>
      <section className={`addMinus ${styles.tracklistButtons}`}>
        <button
          aria-label={ariaLabel}
          className="material-symbols-outlined"
          onClick={handleToggle}
          value={props.songObject.id}
        >
          {minusPlus}
        </button>
        <button
          aria-label="More Information On Song"
          className="material-symbols-outlined"
          onClick={handleInfo}
          value={props.songObject.id}
        >
          double_arrow
        </button>
      </section>
    </div>
  );
};

export {Tracklist};