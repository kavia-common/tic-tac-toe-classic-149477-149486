import Square from './Square';

/**
 * Board renders a 3x3 grid of Square components.
 * It enforces square aspect ratio via CSS and forwards click events.
 */
export default function Board({ squares, onSquareClick, disabled }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          disabled={disabled || Boolean(value)}
          aria-label={`Cell ${idx + 1} ${value ? `occupied by ${value}` : 'empty'}`}
        />
      ))}
    </div>
  );
}
