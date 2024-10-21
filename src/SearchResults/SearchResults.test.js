import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SearchResults } from './SearchResults';

global.open = jest.fn();

afterEach(cleanup);
beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() };
});

describe('Search Section', () => {
    it('Displays search bar and button', () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const searchInput = screen.getByRole('textbox', {name: /search/i});
        const button = screen.getByRole('button', {name: /submit/i});
    
        expect(searchInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
    
    it('Displays user text that was typed to search', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const searchInput = screen.getByRole('textbox', {name: /search/i});
    
        await userEvent.type(searchInput, 'The user types');
        expect(searchInput).toHaveValue('The user types');
    });
});

describe('Tracklist Section - list of songs search results', () => {
    it('Displays song title, artists, plus button and more info button on tracklist', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const songTitle = await screen.findByRole('heading', {name: "Leave Your Mark"});
        const songArtists = await screen.findByRole('heading', {name: "Nyx, Symphony"});
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        const moreInfoButton = await screen.findByRole('button', {name: /More Information On Song/i});
        expect(songTitle).toBeInTheDocument();
        expect(songArtists).toBeInTheDocument();
        expect(plusButton).toBeInTheDocument();
        expect(moreInfoButton).toBeInTheDocument();
    });
    
    it('Minus sign should not show as yet', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        
        await waitFor(() => {
            userEvent.click(plusButton);
    
            const minusButton = screen.queryByRole('button', {name: /Remove Song From Playlist/i});
    
            expect(minusButton).toBeNull();
        });
    })
    
    it('Changes to minus icon when added to playlist', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        
        await userEvent.click(plusButton);
    
        const minusButton = await screen.findByRole('button', {name: /Remove Song From Playlist/i});
    
        expect(minusButton).toBeInTheDocument();
            
        
      
    });
    
    it('Changes to plus icon when clicking on minus to remove from playlist', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        
        await userEvent.click(plusButton);
    
        const minusButton = await screen.findByRole('button', {name: /Remove Song From Playlist/i});
    
        await userEvent.click(minusButton);
    
        expect(plusButton).toBeInTheDocument();
    });
});

describe('More Information Section', () => {
    it('Displays song information after clicking more info button', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const moreInfoButton = await screen.findByRole('button', {name: "More Information On Song"});
        const moreInfoSection = screen.getByTestId("More Information On Selected Song");
    
        await userEvent.click(moreInfoButton);
    
        await waitFor(() => {
            const changeHeader = screen.queryByRole('heading', {name: "Select Arrow For More Info"});
            expect(changeHeader).toBeNull();
        })
    
        const album = await screen.findByRole('heading', {name: /Aim/i});
        const image = await screen.findByRole('img', {name: "album image"});
        const popularity = await screen.findByRole('heading', {name: /92/i});
        const listenOnSpotifyButton = screen.getByRole('button', {name: "Listen On Spotify"});
    
        expect(moreInfoSection).toHaveTextContent("Leave Your Mark");
        expect(moreInfoSection).toHaveTextContent("Nyx, Symphony");
        expect(moreInfoSection).toContainElement(album);
        expect(moreInfoSection).toContainElement(image);
        expect(moreInfoSection).toContainElement(popularity);
        expect(moreInfoSection).toContainElement(listenOnSpotifyButton);
    });
    
    it('Opens Spotify in new window to listen to selected song when button is clicked', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
        
        const listenOnSpotifyButton = screen.getByRole('button', {name: /Listen On Spotify/i});
        expect(listenOnSpotifyButton).toBeInTheDocument();
    
        const moreInfoButton = await screen.findByRole('button', {name: /More Information On Song/i});
        await userEvent.click(moreInfoButton);
    
        await waitFor(() => {
            userEvent.click(listenOnSpotifyButton);
    
            expect(global.open).toHaveBeenCalledWith('https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj', '_blank');
        });
    });
});



//Playlist Section
describe('Playlist Section', () => {
    it ('Displays playlist textbox and send to spotify button', () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const playlistSection = screen.getByTestId("Created Playlist");
        const titleInput = screen.getByRole('textbox', {name: "Playlist Name"});
        const sendToSpotifyButton = screen.getByRole('button', {name: "Save To Spotify"});
        
        expect(playlistSection).toContainElement(titleInput);
        expect(playlistSection).toContainElement(sendToSpotifyButton);
    });
    
    it ('Displays user text that was typed', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const titleInput = screen.getByRole('textbox', {name: "Playlist Name"});
        
        await userEvent.type(titleInput, 'The user types');
        expect(titleInput).toHaveValue('The user types');
    });
    
    it ('Displays song title, artist(s) and remove button after clicking plus button to add to playlist', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
        
        const playlistSection = screen.getByTestId("Created Playlist");
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        await userEvent.click(plusButton);
        
        const songTitle = await screen.findAllByRole('heading', {name: "Leave Your Mark"});
        const songArtists = await screen.findAllByRole('heading', {name:"Nyx, Symphony"});
        const removeButton = await screen.findByRole('button', {name: "Remove Song"});
        
        expect(playlistSection).toContainElement(songTitle[1]);
        expect(playlistSection).toContainElement(songArtists[1]);
        expect(playlistSection).toContainElement(removeButton);
    });
    
    it('Removes song from playlist when X is clicked', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        await userEvent.click(plusButton);
        
        const songTitle = await screen.findAllByRole('heading', {name: "Leave Your Mark"});
        const songArtists = await screen.findAllByRole('heading', {name:"Nyx, Symphony"});
        const removeButton = await screen.findByRole('button', {name: "Remove Song"});
        
        expect(songTitle).toHaveLength(2);
        expect(songArtists).toHaveLength(2);
        expect(removeButton).toBeInTheDocument();
    
        await userEvent.click(removeButton);
    
        await waitFor(() => {
            const songTitleUpdate = screen.queryAllByRole('heading', {name: "Leave Your Mark"});
            const songArtistsUpdate = screen.queryAllByRole('heading', {name:"Nyx, Symphony"});
    
            expect(songTitleUpdate).toHaveLength(1);
            expect(songArtistsUpdate).toHaveLength(1);
            expect(removeButton).not.toBeInTheDocument();
        });
    });
    
    it('Removes song from playlist when minus is clicked', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        await userEvent.click(plusButton);
        
        const songTitle = await screen.findAllByRole('heading', {name: "Leave Your Mark"});
        const songArtists = await screen.findAllByRole('heading', {name:"Nyx, Symphony"});
        const minusButton = await screen.findByRole('button', {name: /Remove Song From Playlist/i});
        
        expect(songTitle).toHaveLength(2);
        expect(songArtists).toHaveLength(2);
        expect(minusButton).toBeInTheDocument();
    
        await userEvent.click(minusButton);
    
        await waitFor(() => {
            const songTitleUpdate = screen.queryAllByRole('heading', {name: "Leave Your Mark"});
            const songArtistsUpdate = screen.queryAllByRole('heading', {name:"Nyx, Symphony"});
            const plusButton = screen.getByRole('button', {name: /Add Song To Playlist/i});
    
            expect(songTitleUpdate).toHaveLength(1);
            expect(songArtistsUpdate).toHaveLength(1);
            expect(plusButton).toBeInTheDocument();
        });
    });
    
    it('Sends selected songs to Spotify account with title when Send To Spotify is clicked', async () => {
        const spotifySearchResults = [{
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
              spotify: "https://open.spotify.com/album/2nJMaFsTHKycqV2H3h4Fyj"
            }
        }]
    
        render(<SearchResults
            sendSearch={spotifySearchResults}
        />);
    
        const plusButton = await screen.findByRole('button', {name: /Add Song To Playlist/i});
        await userEvent.click(plusButton);
        const titleInput = screen.getByRole('textbox', {name: "Playlist Name"});
        await userEvent.type(titleInput, 'The user types');
        const sendToSpotifyButton = screen.getByRole('button', {name: "Save To Spotify"});
        //await userEvent.click(sendToSpotifyButton);
    })
});
