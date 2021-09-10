import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import debounce from 'lodash/debounce';

import { ScreenTypes } from 'utils/enums';

interface ProgressiveContextShape {
  screenType: ScreenTypes;
}

const ProgressiveContext = createContext<ProgressiveContextShape>(null);
export const useProgressiveContext = () => useContext(ProgressiveContext);

export function ProgressiveContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleSizeChange = debounce(() => setWidth(window.innerWidth), 50);
    window.addEventListener('resize', handleSizeChange);
    return () => window.removeEventListener('resize', handleSizeChange);
  }, []);
  return (
    <ProgressiveContext.Provider
      value={{
        screenType: width <= 650 ? ScreenTypes.Mobile : ScreenTypes.Desktop,
      }}
    >
      {children}
    </ProgressiveContext.Provider>
  );
}
