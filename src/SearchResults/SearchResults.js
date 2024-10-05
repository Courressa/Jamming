import React, { useState } from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import { Track } from "../Track/Track";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { PlaylistTitle } from "../Playlist/PlaylistTitle";
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

function SearchResults(props) {
    const [results, setResults] = useState([]);
    const [songName, setSongName] = useState("Select Arrow For More Info");
    const [artist, setArtist] = useState("");
    const [album , setAlbum ] = useState("");

    const sendUserSearch = (collectedSearch) => {
        props.collectSearch(collectedSearch);
    }
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
    const [pushID, setPushID] = useState();
    const changeToPlus = (collectedID) => {
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

    let playlistURI = [];

    const handlePlaylistClick = () => {
        saveSong.map(song => (
            playlistURI.push(`spotify:track:${song.id}`)
        ));
        
        console.log(playlistURI);
        setSaveSong("");
    };

    return (
        <div>
            <section className={styles.searchBar}>
                <SearchBar 
                    collectSearch={sendUserSearch}
                />
            </section>
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
                    <PlaylistTitle />
                    {createList}
                    <button
                        onClick={handlePlaylistClick}
                    >Save To Spotify</button>
                </section>
            </div>
        </div>
    );
};

export {SearchResults};