import React from 'react';

export const useScroll = () => {
  const [marginBottom, setMarginBottom] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setMarginBottom(
        document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop)
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return marginBottom;
};
