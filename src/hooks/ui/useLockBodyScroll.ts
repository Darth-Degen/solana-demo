import { useEffect } from 'react';

export const useLockBodyScroll = (show: boolean) => {
  useEffect(() => {
    if (show) {
      // Get the scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Hide the scrollbar and compensate for the scrollbar width
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      // Show the scrollbar and remove the padding
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [show]);
};

