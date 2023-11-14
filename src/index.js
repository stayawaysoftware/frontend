import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import { WebsocketContextProvider } from "./contexts/WebsocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <WebsocketContextProvider>
      <App />
    </WebsocketContextProvider>
  </UserProvider>
  //</React.StrictMode>
);

reportWebVitals();
