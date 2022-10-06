import React from "react";
import ReactDOM from "react-dom";

import "./firebase";
import "./index.css";
import App from "./App";
import UploadContextProvider from "./context/UploadContext";
import SearchContextProvider from "./context/SearchContext";
import ComunContextProvider from "./context/ComunContext";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ComunContextProvider>
        <UploadContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </UploadContextProvider>
      </ComunContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
