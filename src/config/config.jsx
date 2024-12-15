// API endpoints
const env = "dev"

export const API_URL = env === "dev" ? "http://127.0.0.1:8000/api" : "urlFinal";
// export const API_URL = env === "dev" ? "https://retoolapi.dev/GpZj85" : "urlFinal";
export const API_VERSION = "v1";

// App settings
export const APP_NAME = "Moodia";

// Theme settings
export const THEME_COLORS = {
    primary: "#4CAF50",
    secondary: "#FF9800",
};

export const state = {
    role: ["Usuario", "Administrador"],
    genre: ["Masculino", "Femenino", "Otros", "Prefiero no decirlo"],
    civilStatus: ["Soltero/a", "En pareja", "Casado/a", "Divorciado/a", "Viudo/a", "Prefiero no decirlo"],
    category: ["Amigos", "Familia", "Estudios", "Trabajo"],
};
