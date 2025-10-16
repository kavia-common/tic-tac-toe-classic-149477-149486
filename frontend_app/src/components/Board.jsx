import Square from './Square';
import PropTypes from 'prop-types';

/**
 * Board renders a 3x3 grid of Square components.
 * It enforces square aspect ratio via CSS and forwards click events.
 */
// PUBLIC_INTERFACE
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

Board.propTypes = {
  /** Array of 9 values: 'X', 'O', or null */
  squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])).isRequired,
  /** Click handler invoked with index of clicked square */
  onSquareClick: PropTypes.func.isRequired,
  /** When true, all squares are disabled (e.g., game over) */
  disabled: PropTypes.bool,
};

Board.defaultProps = {
  disabled: false,
};
