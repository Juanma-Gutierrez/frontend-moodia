import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import { apiGetGenres, apiGetCivilStatus, apiGetEmployment, apiGetCategory } from "../apiService/ApiGenericRequest";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isKOScreenVisible, setKOScreenVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Genres actualizado:", genres);
  }, [genres]);

  useEffect(() => {
    console.log("Estados civiles actualizado:", civilStatus);
  }, [civilStatus]);

  useEffect(() => {
    console.log("Empleos actualizado:", employment);
  }, [employment]);

  useEffect(() => {
    console.log("Categorías actualizado:", category);
  }, [category]);

  // Función reutilizable para cargar datos
  const fetchData = async (apiFunction, setter, label) => {
    try {
      const response = await apiFunction();
      if (response.success) {
        console.log(response.data.data);
        setter([...response.data.data]);
      }
    } catch (error) {
      setKOScreenVisible(true);
      console.error(`Error al cargar ${label}`, error);
    }
  };

  // Llamar a init cuando se cargue la aplicación inicializando datos (llamada a la API)
  useEffect(() => {
    const init = async () => {
      try {
        const [genresRes, civilStatusRes, employmentRes, categoryRes] = await Promise.all([
          apiGetGenres(),
          apiGetCivilStatus(),
          apiGetEmployment(),
          apiGetCategory(),
        ]);

        if (genresRes.success) setGenres([...genresRes.data.data]);
        if (civilStatusRes.success) setCivilStatus([...civilStatusRes.data.data]);
        if (employmentRes.success) setEmployment([...employmentRes.data.data]);
        if (categoryRes.success) setCategory([...categoryRes.data.data]);
      } catch (error) {
        setKOScreenVisible(true);
        console.error("Error al cargar los datos:", error);
      }
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
        isLoading,
        setIsLoading,
      }}
    >
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
