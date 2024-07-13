import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SnackProvider } from "./context/SnackContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackProvider>
    </AuthProvider>
  </React.StrictMode>
);
