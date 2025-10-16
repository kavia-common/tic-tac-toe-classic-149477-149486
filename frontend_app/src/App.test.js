import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('shows initial status and allows first move by X', () => {
  render(<App />);
  expect(screen.getByText(/Next: X/i)).toBeInTheDocument();

  const buttons = screen.getAllByRole('button', { name: /Cell/i });
  expect(buttons.length).toBe(9);

  fireEvent.click(buttons[0]);
  // After X move, turn changes to O
  expect(screen.getByText(/Next: O/i)).toBeInTheDocument();
  // First cell should now show X
  expect(buttons[0]).toHaveTextContent('X');
});

test('detects a winner correctly', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button', { name: /Cell/i });

  // X moves
  fireEvent.click(buttons[0]); // X
  fireEvent.click(buttons[3]); // O
  fireEvent.click(buttons[1]); // X
  fireEvent.click(buttons[4]); // O
  fireEvent.click(buttons[2]); // X wins (0,1,2)

  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
});

test('restart button resets the game', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button', { name: /Cell/i });

  fireEvent.click(buttons[0]); // X
  expect(buttons[0]).toHaveTextContent('X');

  const restart = screen.getByRole('button', { name: /Restart game/i });
  fireEvent.click(restart);

  expect(screen.getByText(/Next: X/i)).toBeInTheDocument();
  // All cells empty again
  buttons.forEach((btn) => expect(btn).toHaveTextContent(''));
});
