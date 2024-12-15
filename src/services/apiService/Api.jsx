import { API_URL } from "../../config/config";

export const getTokenFromApi = async () => {
  try {
    const payload = {
      email: "juanma@gmail.com",
      password: "juanma123",
    };

    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    const tokenValue = data["access_token"];
    localStorage.setItem("token", tokenValue);
    return tokenValue;
  } catch (error) {
    console.error("Error al obtener el token de la API:", error.message);
    return null;
  }
};
