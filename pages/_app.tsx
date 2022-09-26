import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalContext } from "../libs/client/GlobalContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
