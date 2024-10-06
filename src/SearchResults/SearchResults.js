import React, { useState, useEffect } from "react";
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
      artists: "Nyx",
      album: "Reach For The Stars",
    },
    {
      id: 2,
      name: "Leave Your Mark",
      artists: "Symphony",
      album: "Aim",
    },
    {
        id: 3,
        name: "asdasd",
        artists: "sadasd",
        album: "asd",
      },
];

function SearchResults(props) {
    const [results, setResults] = useState([]);
    const [songName, setSongName] = useState("Select Arrow For More Info");
    const [artist, setArtist] = useState("");
    const [album , setAlbum] = useState("");
    const [image , setImage] = useState("");
    const [popularity , setPopularity] = useState("None");
    const [songLink , setSongLink] = useState("");

    //getting and sending search results
    const sendUserSearch = (collectedSearch) => {
        props.collectSearch(collectedSearch);
    }

    useEffect(() => {
        setResults(props.sendSearch);
    }, [props.sendSearch])

    //Displays more info for selected track
    const handleMoreInfoClick = (moreInfoID) => {
        let trackID = moreInfoID;
        let imageIndex = 0;
        
        results.map((item) => {
            const displaysArtists = (
                item.artists.map((person, index) => (
                  (index ? ', ' : '') + person.name
                ))
            );

            const displayImage = (
                item.album.images.map(image => image.url)
            );

            
            if (trackID == item.id) {
                setSongName(item.name);
                setArtist(displaysArtists);
                setAlbum(item.album.name);
                setImage(displayImage[imageIndex]);
                setPopularity(item.popularity);
                setSongLink(item.external_urls.spotify);
            }
            
        });
        
        
    };
    
    const [saveSong, setSaveSong] = useState("");
   
    //adding or removing song from playlist
    const handlePlusClick = (plusMinusID) => {
        let songID = plusMinusID;

        results.map((item) => {
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
    const [pushID, setPushID] = useState("");
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

    //creat playlist to send to Spotify
    let playlistURI = [];
    let changePlusAfterSpotifyClick = [];

    const handlePlaylistClick = () => {
        saveSong.map(song => (
            changePlusAfterSpotifyClick.push(song.id),
            playlistURI.push(`spotify:track:${song.id}`)
        ));
        /*for (let i = 0; i < changePlusAfterSpotifyClick.length; i++) {
            setPushID(changePlusAfterSpotifyClick[i]);
            console.log('the click is',changePlusAfterSpotifyClick[i]);
            
        }*/
        setPushID(changePlusAfterSpotifyClick);
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
                <section className={`${styles.searchList} ${styles.dividedArea}`}>
                    {results.map((song, index) => (
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
                <section className={`${styles.moreInfo} ${styles.dividedArea} ${styles.spotifyButtons}`}>
                    <Track 
                        name={songName}
                        songArtist={artist}
                        songAlbum={album}
                        songImage={image}
                        songPopularity={popularity}
                        songOnSpitfyLink={songLink}
                    />
                </section>
                <section className={`${styles.AddedSongs} ${styles.dividedArea}`}>
                    <PlaylistTitle />
                    {createList}
                    <button
                        className={styles.spotifyButtons}
                        onClick={handlePlaylistClick}
                    >Save To Spotify</button>
                </section>
            </div>
        </div>
    );
};

export {SearchResults};