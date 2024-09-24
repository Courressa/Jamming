import React, {useState} from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import { Track } from "../Track/Track";
import {Playlist} from "../Playlist/Playlist";
import styles from "./SearchResults.module.css";

const testSong = [
    {
      id: 1,
      name: "Something Good!",
      artist: "Nyx",
      album: "Reach For The Stars",
    },
    {
      id: 2,
      name: "Leave Your Mark",
      artist: "Symphony",
      album: "Aim",
    },
    {
        id: 3,
        name: "asdasd",
        artist: "sadasd",
        album: "asd",
      },
];

function SearchResults() {
    const [results, setResults] = useState([]);
    const [songName, setSongName] = useState("Select Arrow For More Info");
    const [artist, setArtist] = useState("Select Arrow For More Info");
    const [album , setAlbum ] = useState("Select Arrow For More Info");

    const handleMoreInfoClick = (moreInfoID) => {
        let trackID = moreInfoID;
        
        testSong.map((item) => {
            if (trackID == item.id) {
                setSongName(item.name);
                setArtist(item.artist);
                setAlbum(item.album);
            }
        });
        
        
    };

    const [saveSong, setSaveSong] = useState("");
   
    const handlePlusClick = (plusMinusID) => {
        let songID = plusMinusID;

        testSong.map((item) => {
            if (songID == item.id) {
                setSaveSong(prev => {
                    if (prev.includes(item)) {
                        return prev.filter(x => x !== item);
                    } else {
                        return [item, ...prev];
                    }
                });
            }
        });
    };

    const [pushChange, setPushChange] = useState([]);
    const [pushID, setPushID] = useState();
    const changeToPlus = (change, collectedID) => {
        setPushChange(change);
        setPushID(collectedID);
        
    };

    let createList;
    if (saveSong) {
        createList = saveSong.map((selected) => (
        <Playlist
            key={selected.id}
            listObject={selected}
            remove={handlePlusClick}
            collectRemoval={changeToPlus}
        />))
    }
    console.log(pushChange);
    return (
        <div className={styles.songSections}>
            <section className={styles.searchList}>
                {testSong.map((song, index) => (
                    <Tracklist
                        key={song.id}
                        value={song.name}
                        songObject={song}
                        index={index}
                        addMinus={handlePlusClick}
                        info={handleMoreInfoClick}
                        collectChange={pushChange}
                        collectID={pushID}
                    >
                    </Tracklist>
                ))}
            </section>
            <section className={styles.moreInfo}>
                <Track 
                    name={songName}
                    songArtist={artist}
                    songAlbum={album}
                />
            </section>
            <section className={styles.AddedSongs}>
                <ul>
                    {createList}
                    <button>Save To Spotify</button>
                </ul>
            </section>
        </div>
    );
};

export {SearchResults};