import { globalVariables } from "../../config/config";
import { getTokenFromApi } from "../apiService/Api";

function Auth() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    globalVariables.token = token;
    console.log("Token encontrado:", token, globalVariables.token);
  } else {
    // Llamar a la api para pedir el token
    console.log("Token no encontrado");
    getTokenFromApi();
  }
}

export default Auth;
