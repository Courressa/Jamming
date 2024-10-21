import React, {useState, useEffect} from "react";
import styles from "../Song&Icon Styles/List.module.css";
import "../Song&Icon Styles/ButtonIcons.css";



function Tracklist(props) {
  const [minusPlus, setMinusPlus] = useState("add");
  const [ariaLabel, setAriaLabel] = useState("Add Song To Playlist");
  const songlist = [props.songObject]

  let countToChangeEffect = 0; //used so it will change to plus even when only a certain song is removed and added consecutively
  let collectForCount = [];
  if (props.collectID) {
    collectForCount.push(props.collectID);
    //countToChangeEffect++;
    for (let i = 0; i < collectForCount.length; i++) {
      countToChangeEffect = i;
    }
    console.log("change effect", countToChangeEffect);
  }


  useEffect(() => {
    songlist.map((song) => {
      //change to plus when removed from playlist section
      if (song.id === props.collectID) {
        setMinusPlus("add");
      }

      //change to plus when all songs are sent to Spotify from playlist section
      for (let i = 0; i < props.collectID.length; i++) {
        if (song.id === props.collectID[i]) {
          setMinusPlus("add");
        };
      }

    })
    

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
      <section>
        <h2>{props.songObject.name}</h2>
        <h3>{displaysArtists}</h3>
        
      </section>
      <section className="addMinus">
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
          arrow_right
        </button>
      </section>
    </div>
  );
};

export {Tracklist};