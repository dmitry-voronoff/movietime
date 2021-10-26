import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe( 'Application tests', () => {
    it( 'app renders without errors',() => {
        render(<App />);
        expect(screen.getByText('Filmer')).toBeInTheDocument();
        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    } )
})
