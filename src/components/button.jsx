import cx from 'classnames';
import React from 'react';

export const Button = ({ type = 'button', variant = 'primary', className, ...buttonProps }) => {
  return (
    <button
      className={cx('nes-btn', variant && `is-${variant}`, className)}
      type={type}
      {...buttonProps}
    />
  );
};
