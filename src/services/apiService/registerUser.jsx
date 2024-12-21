import { API_URL } from "../../config/config";

// Función para registrar al usuario
export const registerUser = async (name, email, password, passwordConfirmation) => {
  try {
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    const response = await fetch(API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en el registro:", errorData);
      throw new Error("Error en el registro");
    }

    const data = await response.json();
    console.log("Usuario registrado correctamente:", data);

    // Realizamos el login automáticamente después del registro
    return await loginUser(email, password);
  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);
    return { success: false, error: error.message };
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
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
      const errorData = await response.json();
      console.error("Error en el login:", errorData);
      throw new Error("Error en el login");
    }

    const data = await response.json();
    const tokenValue = data["access_token"];
    localStorage.setItem("token", tokenValue);

    // Llamada para obtener los datos del usuario y almacenar el userId
    const userData = await fetchUserData(tokenValue);
    localStorage.setItem("userId", userData["id"]);

    return { success: true, token: tokenValue, userData };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return { success: false, error: error.message };
  }
};

// Función para obtener los datos del usuario
const fetchUserData = async (tokenValue) => {
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
  return userData;
};
