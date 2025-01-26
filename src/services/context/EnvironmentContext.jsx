import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import { apiGetGenres, apiGetCivilStatus, apiGetEmployment, apiGetCategory } from "../apiService/ApiGenericRequest";
import { KOScreen } from "../../components/KOScreenComponent/KOScreenComponent";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isKOScreenVisible, setKOScreenVisible] = useState(false);

  // Función reutilizable para cargar datos
  const fetchData = async (apiFunction, setter, label) => {
    try {
      const response = await apiFunction();
      if (response.success) {
        setter(response.data.data);
      }
    } catch (error) {
      setKOScreenVisible(true);
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
    <EnvironmentContext.Provider
      value={{
        genres,
        civilStatus,
        employment,
        category,
        isKOScreenVisible,
        setKOScreenVisible,
      }}
    >
      {isKOScreenVisible && <KOScreen />}
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
