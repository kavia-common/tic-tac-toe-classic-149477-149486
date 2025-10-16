import React from 'react';
import PropTypes from 'prop-types';

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
      aria-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <span className={`mark ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`}>
        {value}
      </span>
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Square.defaultProps = {
  value: null,
  disabled: false
};
