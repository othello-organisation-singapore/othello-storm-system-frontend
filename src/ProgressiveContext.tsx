import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
} from 'react';
import debounce from 'lodash/debounce';

import { ScreenType } from 'enums';

const ProgressiveContext = createContext({});
export const useProgressiveContext = () => useContext(ProgressiveContext);

export function ProgressiveContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const handleSizeChange = debounce(() => setWidth(window.innerWidth), 500);
    window.addEventListener('resize', handleSizeChange);
    return () => window.removeEventListener('resize', handleSizeChange);
  }, []);
  return (
    <ProgressiveContext.Provider
      value={{
        screenType: width <= 550 ? ScreenType.Mobile : ScreenType.Desktop,
      }}
    >
      {children}
    </ProgressiveContext.Provider>
  );
}
