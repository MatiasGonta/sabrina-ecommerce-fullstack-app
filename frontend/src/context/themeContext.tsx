import React, { createContext, useState } from 'react';

interface ThemeContextInterface {
  mode: string;
  updateMode: (newMode: string) => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    mode: '',
    updateMode: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({ children }) => {
  const storage = localStorage.getItem('mode');
  const initialMode = storage || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [mode, setMode] = useState<string>(initialMode);

  const updateMode = (newMode: string) => {
    localStorage.setItem('mode', newMode);
    setMode(newMode);
  };

  const themeContextValue: ThemeContextInterface = {
    mode,
    updateMode
  } 

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
