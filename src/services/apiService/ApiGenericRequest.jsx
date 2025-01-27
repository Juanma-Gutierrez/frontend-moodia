import { API_URL } from "../../constants/Constants";
import { HttpMethod } from "./HttpMethod";

export const apiGenericRequest = async (endpoint, body, method = HttpMethod.POST, token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {
      method: method,
      headers: headers,
    };
    if (body && method !== HttpMethod.GET) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    if (!response.ok) {
      console.error(`Error en la solicitud: ${response.status} ${response.statusText} ${token}`);
      return { success: false, data };
    }
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    }
  } catch (error) {
    console.error(`Error en la solicitud para obtener los datos desde ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
};

export const apiGetEmployment = () => apiGenericRequest("employment/get");
export const apiGetGenres = () => apiGenericRequest("genre/get");
export const apiGetCivilStatus = () => apiGenericRequest("civil_status/get");
export const apiGetCategory = () => apiGenericRequest("category/get");
