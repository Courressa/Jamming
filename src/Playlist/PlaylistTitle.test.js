import React from 'react';
import { render, screen, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {PlaylistTitle} from './PlaylistTitle';

afterEach(cleanup);

it ('Displays playlist textbox', () => {
    //arrange
    render(<PlaylistTitle />);

    //act
    const titleInput = screen.getByRole('textbox');

    //assertion
    expect(titleInput).toBeInTheDocument();
});

it ('Displays user text that was typed', async () => {
    render(<PlaylistTitle />);

    const titleInput = screen.getByRole('textbox');
    
    await userEvent.type(titleInput, 'The user types');
    expect(titleInput).toHaveValue('The user types');
});