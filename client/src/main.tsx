import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketContextProvider } from "./SocketContext";

// react strict mode renders all hooks twice this is intentional purpose of react(in development only)

// if we remove this it will be render once

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SocketContextProvider>
    <App />
  </SocketContextProvider>
);
