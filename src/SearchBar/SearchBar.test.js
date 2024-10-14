import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SearchBar } from './SearchBar';

afterEach(cleanup);

it('Displays search bar and button', () => {
    render(<SearchBar />);

    const input = screen.getByRole('textbox', {name: /search/i});
    const button = screen.getByRole('button', {name: /submit/i});

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

it('Displays user text that was typed to search', async () => {
    render(<SearchBar />);

    const searchInput = screen.getByRole('textbox', {name: /search/i});

    await userEvent.type(searchInput, 'The user types');
    expect(searchInput).toHaveValue('The user types');
});