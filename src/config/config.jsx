// API endpoints
const env = "dev";

export const API_URL = env === "dev" ? "http://127.0.0.1:8000/api" : "urlFinal"; // configuración BBDD local
// export const API_URL = env === "dev" ? "https://retoolapi.dev/GpZj85" : "urlFinal"; // configuración API fake
export const API_VERSION = "v1";

// App settings
export const APP_NAME = "Moodia";

// Theme settings
export const THEME_COLORS = {
  primary: "#4CAF50",
  secondary: "#FF9800",
};

export const CONSTANTS = {
  lottie: {
    width: "150px",
    height: "100px",
  },
};

export const USER_ATTRIBUTES = {
  role: ["Usuario", "Administrador"],
  genre: ["Masculino", "Femenino", "Otros", "Prefiero no decirlo"],
  civilStatus: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "En una relación", "Prefiero no decirlo"],
  category: ["Familia", "Amigos", "Deporte", "Estudios", "Trabajo", "Hobby", "Relax"],
  employment: [
    "Estudiante",
    "Trabajador por cuenta propia",
    "Trabajador por cuenta ajena",
    "Desempleado",
    "Jubilado",
    "Prefiero no decirlo",
  ],
};
