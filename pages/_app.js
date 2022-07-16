import React, { useMemo } from "react";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/App.css";

const App = ({ Component, pageProps }) => {

  return (
    <Component {...pageProps} />
  );
};

export default App;
