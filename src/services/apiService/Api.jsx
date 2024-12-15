import { API_URL } from "../../config/config";

export const getTokenFromApi = async (email, password) => {
  try {
    const tokenValue = await firstCall(email, password);
    const userData = await secondCall(tokenValue);

    console.log("Datos del usuario:", userData);
    return { token: tokenValue, userData };
  } catch (error) {
    console.error("Error al obtener el token o los datos del usuario:", error.message);
    return null;
  }
};

// Función para obtener el token
const firstCall = async (email, password) => {
  const payload = {
    email: email,
    password: password,
  };

  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud para obtener el token");
  }

  const data = await response.json();
  const tokenValue = data["access_token"];
  localStorage.setItem("token", tokenValue);

  return tokenValue;
};

// Función para obtener los datos del usuario
const secondCall = async (tokenValue) => {
  const userResponse = await fetch(API_URL + "/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenValue}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error("Error al obtener los datos del usuario");
  }

  const userData = await userResponse.json();
  localStorage.setItem("userId", userData["id"]);

  return userData;
};
