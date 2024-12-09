import { createRoot } from "react-dom/client";
import React from "react";

import "./index.css";
import App from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
