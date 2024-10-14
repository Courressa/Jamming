import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Track } from './Track';
global.open = jest.fn();

afterEach(cleanup);

it('Displays song information after clicking more info button', async () => {
    /*const songObject = [{
        id: 12345,
        name: "Leave Your Mark",
        artists: [
            {name: "Nyx"},
            {name: "Symphony"}
        ],
        album: {
            name:"Aim", 
            images: [{
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
            }]
        },
        popularity: 92,
        external_urls: {
          spotify: "string"
        }
    }]*/

    render(<Track
        name="Leave Your Mark"
        songArtist="Nyx, Symphony"
        songAlbum="Aim"
        songImage="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
        songPopularity={92}
        songOnSpitfyLink="https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
    />);

    
    const title = await screen.findByRole('heading', {name: "Leave Your Mark"});
    const artists = await screen.findByRole('heading', {name: /Nyx, Symphony/i});
    const album = await screen.findByRole('heading', {name: /Aim/i});
    const image = await screen.findByRole('img', {name: "album image"});
    const popularity = await screen.findByRole('heading', {name: /92/i});
    const listenOnSpotifyButton = await screen.findByRole('button', {name: /Listen On Spotify/i});

    expect(title).toBeInTheDocument();
    expect(artists).toBeInTheDocument();
    expect(album).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(popularity).toBeInTheDocument();
    expect(listenOnSpotifyButton).toBeInTheDocument();
});

it('Opens Spotify in new window to listen to selected song when button is clicked', async () => {
    render(<Track
        name="Leave Your Mark"
        songArtist="Nyx, Symphony"
        songAlbum="Aim"
        songImage="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
        songPopularity={92}
        songOnSpitfyLink="https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
    />);
    
    const title = await screen.findByRole('heading', {name: "Leave Your Mark"});
    const listenOnSpotifyButton = await screen.findByRole('button', {name: /Listen On Spotify/i});
    
    expect(listenOnSpotifyButton).toBeInTheDocument();

    await waitFor(() => {
        userEvent.click(listenOnSpotifyButton);

        expect(global.open).toHaveBeenCalledWith('https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj', '_blank');
    });
});