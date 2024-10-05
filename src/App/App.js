import React, {useEffect} from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';



function App() {
  const spotifyBaseRL= "";
  const clientId = 'd8cee3074f8840db821ef5d5b9df1337';
  const redirect_uri = 'http://localhost:3000/callback';
  const params = new URLSearchParams(window.location.hash);
  const accessToken = params.get("#access_token");
  const accessDenied = params.get("#error");
  
  const getAccessToken = async () => {
    try {
      if (!accessToken) {
        alert (
          'Jammming sends your created playlist to Spotify. Login to your spotify account to provide access.'
        );
        redirectToAuthCodeFlow(clientId);
      } else {

      }
      
      async function redirectToAuthCodeFlow(clientId) {
          // TODO: Redirect to Spotify authorization page
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
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchResults />
      </main>
    </div>
  );
}

export default App;
