import React, { createContext, useState } from "react";

const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const darkTheme = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkThemeContext.Provider value={darkTheme}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeContext;
