import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('shows initial status "Next: X" and allows first move by X', () => {
  render(<App />);
  expect(screen.getByText('Next: X')).toBeInTheDocument();

  const cells = screen.getAllByRole('button', { name: /Cell/i });
  expect(cells).toHaveLength(9);

  fireEvent.click(cells[0]);
  expect(screen.getByText('Next: O')).toBeInTheDocument();
  expect(cells[0]).toHaveTextContent('X');
});

test('simulates a win for X and shows "Winner: X"', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Cell/i });

  // X 0
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins on top row

  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('simulates a draw and shows "Draw"', () => {
  render(<App />);
  const c = screen.getAllByRole('button', { name: /Cell/i });

  // Play sequence that leads to a draw:
  // X O X
  // X X O
  // O X O
  fireEvent.click(c[0]); // X
  fireEvent.click(c[1]); // O
  fireEvent.click(c[2]); // X
  fireEvent.click(c[4]); // O
  fireEvent.click(c[3]); // X
  fireEvent.click(c[5]); // O
  fireEvent.click(c[7]); // X
  fireEvent.click(c[6]); // O
  fireEvent.click(c[8]); // X

  expect(screen.getByText('Draw')).toBeInTheDocument();
});

test('click "New Game" resets the board and status', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Cell/i });

  fireEvent.click(cells[0]); // X
  expect(cells[0]).toHaveTextContent('X');

  const restart = screen.getByRole('button', { name: /New Game/i });
  fireEvent.click(restart);

  expect(screen.getByText('Next: X')).toBeInTheDocument();
  // Cells should all be empty
  screen.getAllByRole('button', { name: /Cell/i }).forEach((btn) => {
    expect(btn).toHaveTextContent('');
  });
});
