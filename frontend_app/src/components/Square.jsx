import React from 'react';

/**
 * Square is a single cell button in the Tic Tac Toe grid.
 * It displays X or O and is disabled when filled or the game is over.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, ...rest }) {
  return (
    <button
      type="button"
      className={`square ${value ? 'square--filled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <span className={`mark ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`}>
        {value}
      </span>
    </button>
  );
}
