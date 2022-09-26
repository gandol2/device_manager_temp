import { createContext } from "react";

export const GlobalContext = createContext({
  darkMode: false,
  setDarkMode: (value: boolean) => {},
});
