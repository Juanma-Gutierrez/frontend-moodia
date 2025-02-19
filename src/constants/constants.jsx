// Determining the current environment (development or production)
// The previous code that toggled the value based on the environment is disabled.
// "prod" is set for working with the production configuration.
// const env = import.meta.env.MODE === "development" ? "dev" : "prod";
const env = "prod";

// API URL: depending on the environment (dev or prod), the corresponding URL for the API is selected.
export const API_URL =
  env === "dev"
    ? "http://127.0.0.1:8000/api" // configuración BBDD local
    : "http://18.233.17.222/api"; // url Final configuración BBDD en producción // configuración API fake

// Exporting the API version for use throughout the application.
export const API_VERSION = "v1";

// Application settings
export const APP_NAME = "Moodia";

// Main colors used throughout the application for charts.
const COLORS = {
  PRIMARY_DARK: "#301471",
  PRIMARY_MEDIUM: "#4263EB",
  COLOR1: "#bf0000",
  COLOR2: "#5b1e9c",
  COLOR3: "#989d1c",
  COLOR4: "#0733b1",
  COLOR5: "#1ab208",
};

// Defining global constants that will be used throughout the application, such as score and color values
export const CONSTANTS = {
  SCORE: {
    SCORE1: "Muy mal",
    SCORE2: "Mal",
    SCORE3: "Normal",
    SCORE4: "Bien",
    SCORE5: "Muy bien",
  },

  // Array containing all the possible score descriptions
  SCORE_GLOBAL: ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"],

  // Colors for the application defined earlier
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

  // Date-related constants used in the application
  DATE: {
    DAY_OF_WEEK_D: ["D", "L", "M", "X", "J", "V", "S"],
    MONTHS_MMM: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  },

  // Chart dimensions for the application
  CHARTS: {
    WIDTH: "100%",
    HEIGHT: "300px",
  },

  // Lottie animation dimensions for medium and large sizes
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

  // Button widths for normal and full size
  BUTTON: {
    WIDTH: {
      NORMAL: "160px",
      FULL: "100%",
    },
  },

  // URLs for inspiring background images
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

  // Duration for the snackbar component in milliseconds
  SNACKBAR: {
    DURATION: 3000,
  },
};
