import { API_URL } from "../../config/config";

export const getTokenFromApi = async () => {
  try {
    const number = Math.floor(Math.random() * 50) + 1;
    const response = await fetch(API_URL + "/data/" + number);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    const tokenValue = data["Column 1"];
    localStorage.setItem("token", tokenValue);
    return tokenValue;
  } catch (error) {
    console.error("Error al obtener el token de la API:", error.message);
    return null;
  }
};