import "./index.scss";
import App from "./pages/app/App.jsx";
import React from "react";
import { AuthProvider } from "./services/context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { EnvironmentProvider } from "./services/context/EnvironmentContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnvironmentProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </EnvironmentProvider>
  </React.StrictMode>
);
