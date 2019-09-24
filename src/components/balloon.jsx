import cx from 'classnames';
import React from 'react';

export const Balloon = ({ direction = 'left', shown = true, children, className }) => {
  return (
    <p
      className={cx(
        'nes-balloon',
        direction && `from-${direction}`,
        shown && 'is-shown',
        className
      )}
    >
      {children}
    </p>
  );
};
