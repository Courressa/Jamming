import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from './App';

afterEach(cleanup);
window.alert = jest.fn();

beforeAll(() => {
  delete window.location;
  window.location = { assign: jest.fn() };
});


it('Displays search results after user clicks search', async () => {
  //Setup mock data

  const mockSearchResults = {
    tracks: {
      items: [
        {
          id: 12345,
          name: "Leave Your Mark",
          artists: [{ name: "Nyx" }, { name: "Symphony" }],
          album: { name: "Aim" },
        },
        {
          id: 67890,
          name: "Something Good!",
          artists: [{ name: "Nyx" }],
          album: { name: "Reach For The Stars" },
        },
      ],
    },
  };

  global.fetch = jest.fn((url) => {
    if (url.includes('/search')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSearchResults),
      });
    }
    return Promise.reject(new Error('Not Found'));
  });

  render(<App />);
  
  const searchInput = screen.getByRole('textbox', {name: /search/i});
  await userEvent.type(searchInput, 'Nyx');

  
  await waitFor(() => {
    const songTitle = screen.queryAllByRole('heading', {name: "Something Good!"});
    const songArtists = screen.queryAllByRole('heading', {name: "Nyx, Symphony"});

    expect(songTitle).toHaveLength(0);
    expect(songArtists).toHaveLength(0);
  });

  const searchButton = screen.getByRole('button', {name: /submit/i});
  userEvent.click(searchButton);

  const songTitleUpdate = await screen.findAllByRole('heading', {name: "Something Good!"});
  const songArtistsUpdate = await screen.findAllByRole('heading', {name: "Nyx, Symphony"});

  await waitFor(() => {
    // Check if fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search'),
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: expect.stringContaining('Bearer'),
        },
      })
    );
    //Check if search results are displayed
    expect(songTitleUpdate).toHaveLength(1);
    expect(songArtistsUpdate).toHaveLength(1);
  });
  
});

it('Sends selected songs and playlist title to spotify when save to spotify is clicked', async () => {
  //Setup mock data
  const mockProfileData = {
    id: "user123",
    name: "Test User",
  };

  const mockSearchResults = {
    tracks: {
      items: [
        {
          id: "12345",
          name: "Leave Your Mark",
          artists: [{ name: "Nyx" }, { name: "Symphony" }],
          album: { name: "Aim" },
        },
        {
          id: "67890",
          name: "Something Good!",
          artists: [{ name: "Nyx" }],
          album: { name: "Reach For The Stars" },
        },
      ],
    },
  };

  global.fetch = jest.fn((url) => {
    if (url.includes('/me')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProfileData),
      });
    } else if (url.includes('/search')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSearchResults),
      });
    } else if (url.includes('/playlists')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
     }else if (url.includes('/tracks')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    }
    return Promise.reject(new Error('Not Found'));
  });

  render(<App />);
  
  const searchInput = screen.getByRole('textbox', {name: /search/i});
  await userEvent.type(searchInput, 'Nyx');
  const searchButton = screen.getByRole('button', {name: /submit/i});
  userEvent.click(searchButton);

  const plusButtons = await screen.findAllByRole('button', {name: /Add Song To Playlist/i});
  plusButtons.forEach(button => {
    userEvent.click(button);
  });

  const titleInput = screen.getByRole('textbox', {name: "Playlist Name"});
  await userEvent.type(titleInput, 'My Chill Playlist');
  
  const sendToSpotifyButton = screen.getByRole('button', {name: "Save To Spotify"});
  await userEvent.click(sendToSpotifyButton);

  await waitFor(() => {
    //Checks if playlist is created with entered title
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/playlists'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: expect.stringContaining('Bearer'),
        },
        body: JSON.stringify({
          name: 'My Chill Playlist'
        }),
      })
    );
    //Checks if songs were sent to created playlist
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tracks'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: expect.stringContaining('Bearer'),
        },
        body: JSON.stringify({
          uris: ['spotify:track:67890', 'spotify:track:12345']
        }),
      })
    );
  });
  
});