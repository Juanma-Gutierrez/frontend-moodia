import { API_URL } from "../../config/config";

export const apiGetUserData = async (email, password, setToken, setRole, setIsLoading) => {
  try {
    console.log("Entra a obtener el token");
    setIsLoading(true);
    const tokenValue = await apiGetToken(email, password);
    if (tokenValue.token != undefined) {
      const userMe = await apiGetMe(tokenValue.token);
      if (userMe.userData.id) {
        const role = await apiGetRole(tokenValue.token, userMe.userData.id);
        setRole(role.roleData.data);
        localStorage.setItem("role", role.roleData.data);
      }
      setToken(tokenValue.token);
      return { token: tokenValue.token, userData: userMe };
    }
    console.log("Entra a modificar el rol");
    setIsLoading(false);
  } catch (error) {
    console.error("Error al obtener el token o los datos del usuario:", error.message);
    setIsLoading(false);
    return null;
  }
};

// Función para obtener el token
export const apiGetToken = async (email, password) => {
  if (!email || !password) {
    return { success: false, error: "Credenciales no válidas. Por favor, verifica email y password." };
  }

  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Verifica si la respuesta es válida antes de procesarla
    if (!response.ok) {
      console.error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      throw new Error("No se pudo obtener el token. Verifica tus credenciales o el servidor.");
    }

    const data = await response.json();
    const tokenValue = data["access_token"];
    if (!tokenValue) {
      throw new Error("No se recibió un token válido en la respuesta del servidor.");
    }

    // Almacena el token en localStorage
    localStorage.setItem("token", tokenValue);
    return { success: true, token: tokenValue };
  } catch (error) {
    console.error("Error en la solicitud para obtener el token:", error.message);
    return { success: false, error: error.message };
  }
};

// Función para obtener los datos me del usuario
export const apiGetMe = async (tokenValue) => {
  try {
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
    return { success: true, userData: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función para obtener el rol del usuario
export const apiGetRole = async (tokenValue, idUser) => {
  try {
    const roleResponse = await fetch(API_URL + "/extended_user/getRole/" + idUser, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
    if (!roleResponse.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }
    const roleData = await roleResponse.json();
    console.log("role", roleData["role"]);
    return { success: true, roleData: roleData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
