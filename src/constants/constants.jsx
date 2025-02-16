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

const COLORS = {
  PRIMARY_DARK: "#301471",
  PRIMARY_MEDIUM: "#4263EB",
  COLOR1: "#bf0000",
  COLOR2: "#5b1e9c",
  COLOR3: "#989d1c",
  COLOR4: "#0733b1",
  COLOR5: "#1ab208",
};

export const CONSTANTS = {
  SCORE: {
    SCORE1: "Muy mal",
    SCORE2: "Mal",
    SCORE3: "Normal",
    SCORE4: "Bien",
    SCORE5: "Muy bien",
  },
  SCORE_GLOBAL: ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"],
  COLORS: {
    COLOR1: COLORS.COLOR1,
    COLOR2: COLORS.COLOR2,
    COLOR3: COLORS.COLOR3,
    COLOR4: COLORS.COLOR4,
    COLOR5: COLORS.COLOR5,
    PRIMARY_DARK: COLORS.PRIMARY_DARK,
    PRIMARY_MEDIUM: COLORS.PRIMARY_MEDIUM,
  },
  COLORS_GLOBAL: [COLORS.COLOR1, COLORS.COLOR2, COLORS.COLOR3, COLORS.COLOR4, COLORS.COLOR5],
  DATE: {
    DAY_OF_WEEK_D: ["D", "L", "M", "X", "J", "V", "S"],
    MONTHS_MMM: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  },
  CHARTS: {
    WIDTH: "100%",
    HEIGHT: "300px",
  },
  LOTTIE: {
    MEDIUM: {
      WIDTH: "150px",
      HEIGHT: "100px",
    },
    LARGE: {
      WIDTH: "200px",
      HEIGHT: "200px",
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
