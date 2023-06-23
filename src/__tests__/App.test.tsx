import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('shows title', () => {
    render(<App />);
    const title = screen.getByRole('heading');
    expect(title.textContent).toMatch('Podcaster');
});
