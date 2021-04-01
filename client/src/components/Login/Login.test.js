import { TestLogin } from '.';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

beforeEach(() => {
    render(<TestLogin />);
})

describe('Testing dom', () => {
    it('Should has login texts', () => {
        screen.queryAllByText('Login').map(text => expect(text).toBeInTheDocument());
    })
    it('Should has email label text', () => {
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    })
    it('Should has password label text', () => {
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    })
});

