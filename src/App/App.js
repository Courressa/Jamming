import React, {useState, useEffect} from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';


function App() {
  const appBaseURL = "http://localhost:3000";
  const spotifyBaseRL= "https://api.spotify.com/v1";
  const clientId = '69723d5add8b41c089d5dbf258a0bc45';
  const redirect_uri = `${appBaseURL}/callback`;
  const params = new URLSearchParams(window.location.hash);
  const accessToken = params.get("#access_token");
  const tokenExpirationTime = params.get("expires_in");
  const timeOut = tokenExpirationTime*1000;
  
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundError, setFoundError] = useState(false);

  async function redirectToAuthCodeFlow(clientId) {
    //Redirects to Spotify authorization page
    const generateRandomString = (length) => {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%^*+~;.,() ';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
      
    const state = await generateRandomString(16);
    localStorage.setItem("stateKey", state);
    let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    
    document.location.assign(url);
  };

  useEffect(() => {
    //Retrieves User's Access Token From Spotify
    async function getAccessToken() {
      try {
        if (!accessToken) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
          setTimeout(() => {
            document.location = appBaseURL;
          }, timeOut );
        };
      } catch (error) {
        setFoundError(true);
        console.log(error);
      }
    };

    //Retrieve's User's Profile Info
    async function getProfileID() {
      const profileEndpoint = "/me";
      const urlToFetch = `${spotifyBaseRL}${profileEndpoint}`;
      
      try {
        const response = await fetch(urlToFetch, {
          method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        if (response.ok) {
          const jsonResponse = await response.json();
          const profileID = jsonResponse.id;
          
          setUserID(profileID);
  
          return profileID;
        } else if (!response.ok) {
          setFoundError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAccessToken();
    getProfileID();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Send Search Results to Spotify
  const [userSearchResults, setuserSearchResults] = useState("");
  const [spotifySearchResults, setSpotifySearchResults] = useState([]);
  const collectUserSearch = (collectedResults) => {
    setuserSearchResults(collectedResults);
  }

  useEffect(() => {
    async function getSearch() {
      const searchRequestEndpoint = "/search";
      const requestParams = `?q=${userSearchResults}&type=track`;
      const urlToFetch = `${spotifyBaseRL}${searchRequestEndpoint}${requestParams}`;
      
      if (userSearchResults !== "") {
        try {
          const response = await fetch(urlToFetch, {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
          });
          
          if (response.ok) {
            const jsonResponse = await response.json();
            const tracks = jsonResponse.tracks.items;
            
            setSpotifySearchResults(tracks);
            
            return tracks;
          } else if (!response.ok) {
            setFoundError(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    };

    getSearch();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearchResults]);

  //Creates Playlist on User's Spotify
  const [playlistName, setPlaylistName] = useState("");
  const [createdPlaylistID, setcreatedPlaylistID] = useState("");
  const retrieveName = (title) => {
    setPlaylistName(title);
  };

  useEffect(() => {
    async function sendPlaylistName() {
      const playlistNameEndpoint = `/users/${userID}/playlists`;
      const urlToFetch = `${spotifyBaseRL}${playlistNameEndpoint}`;
      const bodyToSend = {name: playlistName}
      
      if (userID !== "") {
        try {
          const response = await fetch(urlToFetch, {
            method: "POST", 
            body: JSON.stringify(bodyToSend),
            headers: {Authorization: `Bearer ${accessToken}`}
          });
    
          if (response.ok) {
            const jsonResponse = await response.json();
            const playlistID = jsonResponse.id;
            setcreatedPlaylistID(playlistID);
            
            return playlistID;
          } else if (!response.ok) {
            setFoundError(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    sendPlaylistName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistName]);

  const [playlistSongs, setPlaylistSongs] = useState([]);
  const retrieveSongs = (sentSongs) => {
    setPlaylistSongs(sentSongs);
  }

  useEffect(() => {
    async function sendPlaylistSongs() {
      const playlistSongEndpoint = `/playlists/${createdPlaylistID}/tracks`;
      const urlToFetch = `${spotifyBaseRL}${playlistSongEndpoint}`;
      const bodyToSend = {uris: playlistSongs}
      
      if (createdPlaylistID !== "") {
        try {
          const response = await fetch(urlToFetch, {
            method: "POST", 
            body: JSON.stringify(bodyToSend),
            headers: {Authorization: `Bearer ${accessToken}`}
          });
    
          if (response.ok) {
            const jsonResponse = await response.json();
            const playlistID = jsonResponse.id;
            setcreatedPlaylistID(playlistID);
            setcreatedPlaylistID("");
  
            return playlistID
          } else if (!response.ok) {
            setFoundError(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    sendPlaylistSongs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdPlaylistID]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      {isLoading ? (
        <div className='loadingBackground'>
          <section className='loadingPage'>
            <h2>Loading Jammming...</h2>
            <h3>
              Jammming sends your created playlist to Spotify.
              Login to your spotify account to provide access and use Jammming features.
              <br />
              <br />
              Select 'OK' to be redirected to Spotify.
            </h3>
            <button onClick={() => {
              alert (
                'You are being redirected to Spotify from Jammming.'
              );
              redirectToAuthCodeFlow(clientId);
            }}>
              OK
            </button>
          </section>
        </div>
        ) : (
          <main>
            {foundError ? (
              <div className='errorBackground'>
              <section className='errorPage'>
                <h2>Oops! We Ran Into An Error :(</h2>
                <h3>
                  There was an issue with processing your request.
                  <br />
                  <br />
                  Please refresh the page or try again later.
                </h3>
                <button onClick={() => {setFoundError(false);}}>
                  OK
                </button>
              </section>
            </div>
            ) : (
            <SearchResults
              collectSearch={collectUserSearch}
              sendSearch={spotifySearchResults}
              collectPlaylistName={retrieveName}
              collectPlaylistSongs={retrieveSongs}
            />)}
            
          </main>
        )
    }
    </div>
  );
}

export default App;
