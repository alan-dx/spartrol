import { useState, useEffect } from 'react';

function getWindowDimensions() {
  let width = 0
  let height = 0
  if (process.browser) {
    const { innerWidth, innerHeight } = window;
    width = innerWidth;
    height = innerHeight;
  }
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions
}
