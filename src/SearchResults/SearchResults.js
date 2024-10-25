import React, { useState, useEffect } from "react";
import { Tracklist } from '../Tracklist/Tracklist';
import { Track } from "../Track/Track";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { PlaylistTitle } from "../Playlist/PlaylistTitle";
import styles from "./SearchResults.module.css";

function SearchResults(props) {
    const [results, setResults] = useState([]);
    const [songName, setSongName] = useState("Select An Arrow Button");
    const [artist, setArtist] = useState("");
    const [album , setAlbum] = useState("");
    const [image , setImage] = useState("");
    const [popularity , setPopularity] = useState("None");
    const [songLink , setSongLink] = useState("");
    const [preview, setPreview] = useState("")

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
                setPreview(item.preview_url);
            }
        });
        
        
    };
    
    const [saveSong, setSaveSong] = useState("");
    const [addMinus, setAddMinus] = useState("");

    //adding or removing song from playlist
    const handleAddRemoveClick = (plusMinusID) => {
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

    //helps with effect change in tracklist to change to plus sign when 1 specific song is consecutively added and removed with X
    const [collectForCount, setcollectForCount] = useState(0); 
    const handleTracklistEffectCount = () => {
        setcollectForCount(collectForCount + 1);
    }

    let createList;
    if (saveSong) {
        createList = saveSong.map((selected) => (
        <Playlist
            key={selected.id}
            listObject={selected}
            remove={handleAddRemoveClick}
            collectRemoval={changeToPlus}
            collectCount={handleTracklistEffectCount}
        />))
    }

    //creat playlist to send to Spotify
    let playlistURI = [];
    let changePlusAfterSpotifyClick = [];

    const [ping, setPing] = useState(false);
    const [confirmPlaylistNameForClick, setConfirmPlaylistNameForClick] = useState("");

    const handlePlaylistClick = () => {
        if (saveSong === "" || confirmPlaylistNameForClick === "") {
            setPing(false);
            alert ("Please add a song to your playlist and name your playlist before saving to Spotify.");
        } else {
            setPing(true);
            saveSong.map(song => (
                changePlusAfterSpotifyClick.push(song.id),
                playlistURI.push(`spotify:track:${song.id}`)
            ));
            
            setPushID(changePlusAfterSpotifyClick);
            props.collectPlaylistSongs(playlistURI);
            setSaveSong("");
        }
    };
    let collectNamePing = ping;
    //Sends Playlist Name Info To App.js
    const sendPlaylistName = (collectedName) => {
        props.collectPlaylistName(collectedName);
        setConfirmPlaylistNameForClick(collectedName);
        setPing(false);
    }

    return (
        <div>
            <section className={styles.searchBar}>
                <SearchBar 
                    collectSearchInput={sendUserSearch}
                />
            </section>
            <div className={styles.songSections}>
                <section
                    className={`${styles.searchList} ${styles.dividedArea}`}
                    aria-label="Tracklist With Search Results"
                    data-testid="Tracklist With Search Results"
                >
                    {results.map((song, index) => (
                        <Tracklist
                            key={song.id}
                            value={song.name}
                            songObject={song}
                            index={index}
                            addMinus={handleAddRemoveClick}
                            info={handleMoreInfoClick}
                            collectID={pushID}
                            sendEffectCount={collectForCount}
                        >
                        </Tracklist>
                    ))}
                </section>
                <section
                    className={`${styles.moreInfo} ${styles.dividedArea} ${styles.spotifyButtons}`}
                    aria-label="More Information On Selected Song"
                    data-testid="More Information On Selected Song"
                >
                    <Track 
                        name={songName}
                        songArtist={artist}
                        songAlbum={album}
                        songImage={image}
                        songPopularity={popularity}
                        songOnSpitfyLink={songLink}
                        songPreview={preview}
                    />
                </section>
                <section
                    className={`${styles.AddedSongs} ${styles.dividedArea}`}
                    aria-label="Created Playlist"
                    data-testid="Created Playlist"
                >
                    <PlaylistTitle
                        collectName={sendPlaylistName}
                        sendCollectPing={collectNamePing}
                    />
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