import { API_URL } from "../../constants/Constants";

export const apiGetData = async (endpoint, setKOScreenVisible) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      setKOScreenVisible(true);
      console.error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      throw new Error(`No se pudo obtener los datos desde ${endpoint}. Verifica el servidor.`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    setKOScreenVisible(true);
    console.error(`Error en la solicitud para obtener los datos desde ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
};

export const apiGetEmployment = () => apiGetData("employment/get");
export const apiGetGenres = () => apiGetData("genre/get");
export const apiGetCivilStatus = () => apiGetData("civil_status/get");
export const apiGetCategory = () => apiGetData("category/get");
