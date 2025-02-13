import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import {
  apiGetGenres,
  apiGetCivilStatus,
  apiGetEmployment,
  apiGetCategory,
  apiGetInspiringPhrases,
} from "@services/apiService/ApiGenericRequest";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [genres, setGenres] = useState([]);
  const [inspiringPhrases, setInspiringPhrases] = useState([]);
  const [isKOScreenVisible, setKOScreenVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoIsLoading, setLogoIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [genresRes, civilStatusRes, employmentRes, categoryRes, inspiringPhrasesRes] = await Promise.all([
          apiGetGenres(),
          apiGetCivilStatus(),
          apiGetEmployment(),
          apiGetCategory(),
          apiGetInspiringPhrases(),
        ]);

        if (genresRes.success) setGenres([...genresRes.data.data]);
        if (civilStatusRes.success) setCivilStatus([...civilStatusRes.data.data]);
        if (employmentRes.success) setEmployment([...employmentRes.data.data]);
        if (categoryRes.success) setCategory([...categoryRes.data.data]);
        if (inspiringPhrasesRes.success) setInspiringPhrases([...inspiringPhrasesRes.data.data]);
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
        inspiringPhrases,
        isKOScreenVisible,
        setKOScreenVisible,
        isLoading,
        setIsLoading,
        logoIsLoading,
        setLogoIsLoading,
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
