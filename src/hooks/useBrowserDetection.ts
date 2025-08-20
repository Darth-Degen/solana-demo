import { useEffect, useState } from 'react';

export enum Browser {
  Chrome = 'Chrome',
  Firefox = 'Firefox',
  Safari = 'Safari',
  Edge = 'Edge',
  IE = 'IE',
  Other = 'Other',
}

const useBrowserDetection = (): Browser => {
  const [browser, setBrowser] = useState<Browser>(Browser.Other);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('chrome') && !userAgent.includes('edge')) {
      setBrowser(Browser.Chrome);
    } else if (userAgent.includes('firefox')) {
      setBrowser(Browser.Firefox);
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      setBrowser(Browser.Safari);
    } else if (userAgent.includes('edge')) {
      setBrowser(Browser.Edge);
    } else if (userAgent.includes('trident') || userAgent.includes('msie')) {
      setBrowser(Browser.IE);
    }
  }, []);

  return browser;
};

export default useBrowserDetection;
