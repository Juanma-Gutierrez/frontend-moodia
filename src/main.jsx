import "./index.scss";
import App from "./pages/App/App.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { IsLoadingProvider } from "./services/context/IsLoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IsLoadingProvider>
      <App />
    </IsLoadingProvider>
  </React.StrictMode>
);
