import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Tracklist } from './Tracklist';
import { SearchResults } from '../SearchResults/SearchResults';

afterEach(cleanup);

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve({ data: 'mock data' })
    })
);

it('Displays song title, artists, plus button and more info button on tracklist', async () => {
    const songObject = {
        name: "Something Good!",
        artists: [{name: "Nyx"}, {name: "Symphony"}]
    }

    render(<Tracklist
        songObject={songObject}
        collectID={12345}
    />);

    const songTitle = await screen.findByRole('heading', {name: "Something Good!"});
    const songArtists = await screen.findByRole('heading', {name: "Nyx, Symphony"});
    const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
    const moreInfoButton = await screen.findByRole('button', {name: /More Information On Song/i});
    expect(songTitle).toBeInTheDocument();
    expect(songArtists).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(moreInfoButton).toBeInTheDocument();
});

it('Minus sign should not show as yet', async () => {
    const songObject = {
        name: "Something Good!",
        artists: [{name: "Nyx"}, {name: "Symphony"}]
    }

    render(<Tracklist
        songObject={songObject}
        collectID={12345}
    />);

    const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
    
    await waitFor(() => {
        userEvent.click(plusButton);

        const minusButton = screen.queryByRole('button', {name: /Remove Song From Playlist/i});

        expect(minusButton).toBeNull();
    });
})

it('Changes to minus icon when added to playlist', async () => {
    const songObject = {
        id: 12345,
        name: "Leave Your Mark",
        artists: [{name: "Nyx"}, {name: "Symphony"}],
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
    }
    render(<Tracklist
        songObject={songObject}
        collectID={12345}
    />);

    const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
    await userEvent.click(plusButton);

    await waitFor(() => {

        const minusButton = screen.getByRole('button', {name: /Remove Song From Playlist/i});

        expect(minusButton).toBeInTheDocument();
    });
        
    
  
})