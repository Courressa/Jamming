import React, {useState, useEffect} from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';



function App() {
  const appBaseURL = "http://localhost:3000";
  const spotifyBaseRL= "https://api.spotify.com/v1";
  const clientId = 'd8cee3074f8840db821ef5d5b9df1337';
  const redirect_uri = `${appBaseURL}/callback`;
  const params = new URLSearchParams(window.location.hash);
  const accessToken = params.get("#access_token");
  const tokenExpirationTime = params.get("expires_in");
  const timeOut = tokenExpirationTime*1000;
  const accessDenied = params.get("#error");

  
  //Retrieves User's Access Token From Spotify
  async function getAccessToken() {
    try {
      if (!accessToken) {
        alert (
          'Jammming sends your created playlist to Spotify. Login to your spotify account to provide access.'
        );
        redirectToAuthCodeFlow(clientId);
      } else {
        setTimeout(() => {
          document.location = appBaseURL;
        }, timeOut );
      }
      
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
        
        document.location = url;
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  //Retrieve's User's Profile Info
  const [userID, setUserID] = useState("");

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
    getProfileID();
  }, [])

  

  //Send Search Results to Spotify
  const [userSearchResults, setuserSearchResults] = useState("");
  const [spotifySearchResults, setSpotifySearchResults] = useState([]);
  const collectUserSearch = (collectedResults) => {
    setuserSearchResults(collectedResults);
  }

  async function getSearch() {
    const searchRequestEndpoint = "/search";
    const requestParams = `?q=${userSearchResults}&type=track`;
    const urlToFetch = `${spotifyBaseRL}${searchRequestEndpoint}${requestParams}`;
    
    try {
      const response = await fetch(urlToFetch, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const tracks = jsonResponse.tracks.items;
        
        setSpotifySearchResults(tracks);
        
        return tracks;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
    
  }, [userSearchResults])
  
  //Creates Playlist on User's Spotify

  async function sendPlaylistName(name) {
    const playlistNameEndpoint = `/users/${userID}/playlists`;
    const urlToFetch = `${spotifyBaseRL}${playlistNameEndpoint}`;
    const bodyToSend = {name: name}
    
    try {
      const response = await fetch(urlToFetch, {
        method: "POST", 
        body: JSON.stringify(bodyToSend),
        headers: {Authorization: `Bearer ${accessToken}`}
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchResults
          collectSearch={collectUserSearch}
          sendSearch={spotifySearchResults}
          collectPlaylistName={sendPlaylistName}
        />
      </main>
    </div>
  );
}

export default App;
