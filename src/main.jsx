import "./index.css";
import App from "./pages/App.jsx";
import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(

    <React.StrictMode>
      <App />
    </React.StrictMode>

);
