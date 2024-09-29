import React, {useState, useEffect} from "react";
import styles from "../Song&Icon Styles/List.module.css";
import "../Song&Icon Styles/ButtonIcons.css";



function Tracklist(props) {
  const [minusPlus, setMinusPlus] = useState("add");
  const songlist = [props.songObject]

  useEffect(() => {
    songlist.map((song) => {
      if (song.id == props.collectID) {
        setMinusPlus("add");
      }
    }, [props.collectID])
    

  });
  
  const handleToggle = (event) => {
    props.addMinus(event.target.value);

    if (minusPlus === ("add")) {
      setMinusPlus("remove");
  } else if (minusPlus === ("remove")) {
      setMinusPlus("add");
  }
  };

  const handleInfo = (event) => {
    props.info(event.target.value);
  };

  return (
    <div className={styles.eachSong}>
      <section>
        <h2>{props.songObject.name}</h2>
        <h3>{props.songObject.artist}</h3>
      </section>
      <section>
        <button
          className="material-symbols-outlined"
          onClick={handleToggle}
          value={props.songObject.id}
        >
          {minusPlus}
        </button>
        <button
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