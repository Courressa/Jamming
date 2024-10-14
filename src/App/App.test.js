import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Jammming');
  expect(linkElement).toBeInTheDocument();
});