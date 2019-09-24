import cx from 'classnames';
import React from 'react';

export const Text = ({ as: Component = 'p', variant, className, ...restProps }) => (
  <Component className={cx('nes-text', variant && `is-${variant}`, className)} {...restProps} />
);
