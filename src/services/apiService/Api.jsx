import { API_URL } from "../../constants/Constants";
import { HttpMethod } from "./RequestModel";

export const apiGetUserData = async (email, password, setToken, setRole, setIsLoading) => {
  try {
    console.log("Entra a obtener el token");
    loading(true, setIsLoading)
    const tokenValue = await apiGetToken(email, password);
    if (tokenValue.token != undefined) {
      const userMe = await apiGetMe(tokenValue.token);
      if (userMe.userData.id) {
        const role = await apiGetRole(tokenValue.token, userMe.userData.id);
        setRole(role.roleData.data);
      }
      setToken(tokenValue.token);
      return { token: tokenValue.token, userData: userMe };
    }
    console.log("Entra a modificar el rol");
    loading(false, setIsLoading)
  } catch (error) {
    console.error("Error al obtener el token o los datos del usuario:", error.message);
    loading(false, setIsLoading)
    return null;
  }
};

function loading(loading, setIsLoading) {
  if (typeof setIsLoading === "function") {
    setIsLoading(loading);
  }
}

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
    return { success: true, roleData: roleData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Petición genérica a la API
export const apiRequest = async (apiRequestInstance) => {
  try {
    // Desestructurar la instancia de ApiRequest
    const { endpoint, method = HttpMethod.GET, body = null, token = null } = apiRequestInstance;
    const headers = {
      "Content-Type": "application/json",
    };
    // Si el token está presente, se añade al header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {
      method: method,
      headers: headers,
    };
    // Si el método es POST o PUT, se añade el cuerpo de la petición
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(API_URL + endpoint, options);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
