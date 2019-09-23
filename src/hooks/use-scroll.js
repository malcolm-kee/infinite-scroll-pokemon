import React from 'react';
import { throttle } from '../lib';

export const useScroll = () => {
  const [marginBottom, setMarginBottom] = React.useState(0);

  const setMarginRef = React.useRef(
    throttle(() => {
      setMarginBottom(
        document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop)
      );
    })
  );

  React.useEffect(() => {
    const handleScroll = setMarginRef.current;

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return marginBottom;
};
