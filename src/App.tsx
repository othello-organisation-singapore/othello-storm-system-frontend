import React from 'react';

import { ProgressiveContextProvider } from 'ProgressiveContext';
import { UserContextProvider } from 'UserContext';
import { ThemeContextProvider } from 'ThemeContext';

import OSS from './pages';

function App() {
  return (
    <ProgressiveContextProvider>
      <ThemeContextProvider>
        <UserContextProvider>
          <OSS />
        </UserContextProvider>
      </ThemeContextProvider>
    </ProgressiveContextProvider>
  );
}

export default App;
