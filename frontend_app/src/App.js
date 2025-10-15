import React, { useState, useMemo } from 'react';
import './index.css';
import Board from './components/Board';

/**
 * calculateWinner determines the winner of a Tic Tac Toe board.
 * It returns 'X' or 'O' if a winner exists, otherwise null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export default function App() {
  /**
   * The main application component for the Tic Tac Toe game.
   * Manages game state, handles user actions, and displays the status and restart control.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => squares.every(Boolean) && !winner, [squares, winner]);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /** Handle a square click: ignore if game is over or square filled; place mark and toggle turn. */
    if (winner || squares[index]) return;
    setSquares((prev) => {
      const next = prev.slice();
      next[index] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    /** Reset the game to its initial state. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let statusText = `Next: ${currentPlayer}`;
  let statusClass = 'status';
  if (winner) {
    statusText = `Winner: ${winner}`;
    statusClass += ' status--win';
  } else if (isDraw) {
    statusText = 'Draw';
    statusClass += ' status--draw';
  }

  return (
    <div className="app-root">
      <div className="game-card">
        <header className="game-header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className={statusClass} role="status" aria-live="polite">{statusText}</p>
        </header>

        <main>
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            disabled={Boolean(winner) || isDraw}
          />
        </main>

        <footer className="controls">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRestart}
            aria-label="Restart game"
          >
            New Game
          </button>
        </footer>
      </div>
    </div>
  );
}
