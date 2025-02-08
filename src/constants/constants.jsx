// API endpoints
const env = import.meta.env.MODE === "development" ? "dev" : "prod";

// export const API_URL =
// env === "dev"
//   ? "http://127.0.0.1:5174/api" // configuración BBDD local en modo debug en Laravel, puerto 9003
//   : "https://retoolapi.dev/GpZj85"; // url Final configuración BBDD en producción // configuración API fake

export const API_URL =
  env === "dev"
    ? "http://127.0.0.1:8000/api" // configuración BBDD local
    : "https://retoolapi.dev/GpZj85"; // url Final configuración BBDD en producción // configuración API fake

// console.log(`Entorno actual: ${env}`);
// console.log(`API_URL configurada: ${API_URL}`);

export const API_VERSION = "v1";

// App settings
export const APP_NAME = "Moodia";

export const CONSTANTS = {
  LOTTIE: {
    MEDIUM: {
      WIDTH: "150px",
      HEIGHT: "100px",
    },
    LARGE: {
      WIDTH: "250px",
      HEIGHT: "250px",
    },
  },
  BUTTON: {
    WIDTH: {
      NORMAL: "160px",
      FULL: "100%",
    },
  },
  INSPIRING_PHRASE: {
    BACKGROUND: {
      1: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/01_family.jpg",
      2: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/02_friends.jpg",
      3: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/03_sports.jpg",
      4: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/04_studies.jpg",
      5: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/05_work.jpg",
      6: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/06_hobbies.jpg",
      7: "https://raw.githubusercontent.com/Juanma-Gutierrez/moodia-storage/refs/heads/main/images/inspiringPhrases/07_relax.jpg",
    },
  },
  SNACKBAR: {
    DURATION: 3000,
  },
};
