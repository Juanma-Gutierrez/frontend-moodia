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
      NORMAL: "120px",
      FULL: "100%",
    },
  },
  INSPIRING_PHRASE: {
    BACKGROUND: {
      1: "https://lh3.googleusercontent.com/d/1IJE6j6xLQNkJHDsioHd_9-hrm_i8lHkR=w1000",
      2: "https://lh3.googleusercontent.com/d/1o7EtTCSZELBAb3Xsd0i4QlPqPrDbclD8=w1000",
      3: "https://lh3.googleusercontent.com/d/1q1eUMUdNOGtQ5VNqoRiJwK0oGWdiAcSn=w1000",
      4: "https://lh3.googleusercontent.com/d/1Bf2TTd6ifLCY5ylF84iB0nodYZTnsxTv=w1000",
      5: "https://lh3.googleusercontent.com/d/1U2sJm8am7kUG8B3p7aVI1S5Gl_2-B1Qg=w1000",
      6: "https://lh3.googleusercontent.com/d/1Xh3uGXhUngUqdniLV0u22Agk1Mm2VSOc=w1000",
      7: "https://lh3.googleusercontent.com/d/1dUt-S7_qvmpWGc4FxLDcAzIeNO-6Idj9=w1000",
    },
  },
};
