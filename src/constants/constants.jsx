// API endpoints
const env = import.meta.env.MODE === "development" ? "dev" : "prod";

// export const API_URL = env === "dev" ? "http://127.0.0.1:8000/api" : "urlFinal"; // configuración BBDD local
// export const API_URL = env === "dev" ? "https://retoolapi.dev/GpZj85" : "urlFinal"; // configuración API fake
export const API_URL =
  env === "dev"
    ? "http://127.0.0.1:8000/api" // configuración BBDD local
    : "https://retoolapi.dev/GpZj85"; // url Final configuración BBDD en producción

// console.log(`Entorno actual: ${env}`);
// console.log(`API_URL configurada: ${API_URL}`);

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
