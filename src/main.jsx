import "./index.scss";
import App from "./pages/App/App.jsx";
import React from "react";
import { AuthProvider } from "./services/context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { EnvironmentProvider } from "./services/context/EnvironmentContext.jsx";
import { IsLoadingProvider } from "./services/context/IsLoadingContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnvironmentProvider>
      <BrowserRouter>
      <AuthProvider>
        <IsLoadingProvider>
          <App />
        </IsLoadingProvider>
      </AuthProvider>
      </BrowserRouter>
    </EnvironmentProvider>
  </React.StrictMode>
);
