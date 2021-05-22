import { createContext, ReactNode, useContext, useState } from 'react';

const ThemeContext = createContext(null);
export const useThemeContext = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}
