import React, {useState} from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import { Track } from "../Track/Track";
import {Playlist} from "../Playlist/Playlist";

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
];

function SearchResults() {
    const [results, setResults] = useState([]);
    const [songName, setSongName] = useState("Select Arrow For More Info");
    const [artist, setArtist] = useState("Select Arrow For More Info");
    const [album , setAlbum ] = useState("Select Arrow For More Info");

    const handleMoreInfoClick = (event) => {
        let trackID = event.target.value;
        
        testSong.map((item) => {
            if (trackID == item.id) {
                setSongName(item.name);
                setArtist(item.artist);
                setAlbum(item.album);
            }
        });
        
        
    };

    const [saveSong, setSaveSong] = useState("");
    
    const handlePlusClick = (event) => {
        let songID = event.target.value;

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

    let createList;
    if (saveSong) {
        createList = saveSong.map((selected) => (<Playlist key={selected.id} listObject={selected}/>))
    }

    return (
        <div>
            <section>
                {testSong.map((song, index) => (
                    <Tracklist
                        key={song.id}
                        value={song.name}
                        songObject={song}
                        index={index}
                    >
                    <button
                        onClick={handleMoreInfoClick}
                        value={song.id}
                    >More Info</button> 
                    <button
                        onClick={handlePlusClick}
                        value={song.id}
                    >Plus/Minus</button>
                    </Tracklist>
                ))}
            </section>
            <section>
                <Track 
                    name={songName}
                    songArtist={artist}
                    songAlbum={album}
                />
            </section>
            <section>
                <ul>
                    {createList}
                    <button>Save To Spotify</button>
                </ul>
            </section>
        </div>
    );
};

export {SearchResults};