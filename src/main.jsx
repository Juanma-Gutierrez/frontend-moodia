import "./index.scss";
import App from "./pages/App/App.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { IsLoadingProvider } from "./services/context/IsLoadingContext.jsx";
import { EnvironmentProvider } from "./services/context/EnvironmentContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnvironmentProvider>
      <IsLoadingProvider>
        <App />
      </IsLoadingProvider>
    </EnvironmentProvider>
  </React.StrictMode>
);
