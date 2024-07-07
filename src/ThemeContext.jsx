import React, { createContext, useContext, useState, useMemo ,useEffect} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeToggleContext = createContext();
const ModeContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const useMode = () => useContext(ModeContext);

export const ThemeToggleProvider = ({ children }) => {

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ModeContext.Provider value={mode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ModeContext.Provider>
    </ThemeToggleContext.Provider>
  );
};
