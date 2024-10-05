import React, {useState, useEffect} from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';



function App() {
  const appBaseURL = "http://localhost:3000";
  const spotifyBaseRL= "https://api.spotify.com";
  const clientId = 'd8cee3074f8840db821ef5d5b9df1337';
  const redirect_uri = `${appBaseURL}/callback`;
  const params = new URLSearchParams(window.location.hash);
  const accessToken = params.get("#access_token");
  const tokenExpirationTime = params.get("expires_in");
  const timeOut = tokenExpirationTime*1000;
  const accessDenied = params.get("#error");

  
  //Retrieves user's access token from Spotify
  const getAccessToken = async () => {
    try {
      if (!accessToken) {
        console.log(accessToken);
        alert (
          'Jammming sends your created playlist to Spotify. Login to your spotify account to provide access.'
        );
        redirectToAuthCodeFlow(clientId);
      } else {
        setTimeout(() => {
          document.location = appBaseURL;
        }, timeOut );
        console.log(timeOut);
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
        let scope = 'user-read-private user-read-email';
        
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

  useEffect(() => {
    getAccessToken();
  }, [])

  //Send Search Results to Spotify
  const [userSearchResults, setuserSearchResults] = useState("");
  const collectUserSearch = (collectedResults) => {
    setuserSearchResults(collectedResults);
  }

  const getSearch = async () => {
    const searchRequestEndpoint = "/v1/search";
    const requestParams = `?q=${userSearchResults}&type=track`;
    const urlToFetch = `${spotifyBaseRL}${searchRequestEndpoint}${requestParams}`;
    
    try {
      const response = await fetch(urlToFetch, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [userSearchResults])
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchResults
          collectSearch={collectUserSearch}
        />
      </main>
    </div>
  );
}

export default App;
