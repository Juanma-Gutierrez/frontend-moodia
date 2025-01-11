import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import { apiGetGenres, apiGetCivilStatus, apiGetEmployment, apiGetCategory } from "../apiService/apiGetData";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [category, setCategory] = useState([]);

  // Función reutilizable para cargar datos
  const fetchData = async (apiFunction, setter, label) => {
    try {
      const response = await apiFunction();
      if (response.success) {
        setter(response.data.data);
        console.log(`${label} cargado correctamente`, response.data);
      }
    } catch (error) {
      console.error(`Error al cargar ${label}`, error);
    }
  };

  // Llamar a init cuando se cargue la aplicación inicializando datos (llamada a la API)
  useEffect(() => {
    const init = async () => {
      await fetchData(apiGetGenres, setGenres, "Géneros");
      await fetchData(apiGetCivilStatus, setCivilStatus, "Estados civiles");
      await fetchData(apiGetEmployment, setEmployment, "Empleos");
      await fetchData(apiGetCategory, setCategory, "Categorias");
    };
    init();
  }, []);

  return (
    <EnvironmentContext.Provider value={{ genres, civilStatus, employment, category }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

EnvironmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEnvironmentContext = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error("useEnvironment debe usarse dentro de un EnvironmentProvider");
  }
  return context;
};
