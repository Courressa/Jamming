import React from 'react';
import { render, screen, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom";
import { Playlist } from './Playlist';

afterEach(cleanup);

it ('Displays song title and artist(s)', async () => {
    const songObject = {
      name: "Something Good!",
      artists: [{name: "Nyx"}, {name: "Symphony"}]
    }

    render(<Playlist
        listObject={songObject}
    />);

    const songTitle = await screen.findByRole('heading', {name: "Something Good!"});
    const songArtists = await screen.findByRole('heading', {name: "Nyx, Symphony"});
    expect(songTitle).toBeInTheDocument();
    expect(songArtists).toBeInTheDocument();
});