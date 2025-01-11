// API endpoints
const env = "dev";

export const API_URL = env === "dev" ? "http://127.0.0.1:8000/api" : "urlFinal"; // configuración BBDD local
// export const API_URL = env === "dev" ? "https://retoolapi.dev/GpZj85" : "urlFinal"; // configuración API fake
export const API_VERSION = "v1";

// App settings
export const APP_NAME = "Moodia";

export const CONSTANTS = {
  lottie_medium: {
    width: "150px",
    height: "100px",
  },
  lottie_large: {
    width: "250px",
    height: "250px",
  },

};
