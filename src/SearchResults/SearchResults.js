import React, {useState} from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import { Track } from "../Track/Track";

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
    const [songName, setSongName] = useState("");
    const [artist, setArtist] = useState("");
    const [album , setAlbum ] = useState("");

    const handleClick = (event) => {
        let trackID = event.target.value;
        
        testSong.map((item, i) => {
            if (trackID == item.id) {
                setSongName(item.name);
                setArtist(item.artist);
                setAlbum(item.album);
                console.log(item.artist);
            }
        });
        
        
    };

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
                        onClick={handleClick}
                        value={song.id}
                    >More Info</button> 
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
        </div>
    );
};

export {SearchResults};