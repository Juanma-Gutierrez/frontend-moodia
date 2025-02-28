import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import {
  apiGetGenres,
  apiGetCivilStatus,
  apiGetEmployment,
  apiGetCategory,
  apiGetInspiringPhrases,
} from "@services/ApiService/ApiGenericRequest";

const EnvironmentContext = createContext();

/**
 * EnvironmentProvider component that provides environmental-related state and methods.
 *
 * This component fetches various environmental data (such as genres, civil status, employment,
 * categories, and inspiring phrases) upon initialization using the provided API methods.
 * It manages the loading state, the visibility of a "KO" (error) screen, and other environmental
 * variables. The data is stored in the corresponding state variables and made available to
 * the rest of the app through `EnvironmentContext`.
 *
 * It provides the following values through the `EnvironmentContext`:
 * - `genres`: List of genres fetched from the API.
 * - `civilStatus`: List of civil statuses fetched from the API.
 * - `employment`: List of employment statuses fetched from the API.
 * - `category`: List of categories fetched from the API.
 * - `inspiringPhrases`: List of inspiring phrases fetched from the API.
 * - `isKOScreenVisible`: Boolean indicating if the "KO" screen (error screen) should be visible.
 * - `setKOScreenVisible`: Method to update the visibility of the "KO" screen.
 * - `isLoading`: Boolean indicating if data is still loading.
 * - `setIsLoading`: Method to update the loading state.
 * - `logoIsLoading`: Boolean indicating if the logo is still loading.
 * - `setLogoIsLoading`: Method to update the logo loading state.
 *
 * It also has the following side effects:
 * - On mount, it fetches data from various API endpoints in parallel and updates the state
 *   variables with the fetched data.
 * - If an error occurs during data fetching, it sets `isKOScreenVisible` to true to show an error screen.
 *
 * @param {Object} props - The props for this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {JSX.Element} - The `EnvironmentContext.Provider` that wraps the children components.
 */
export const EnvironmentProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [genres, setGenres] = useState([]);
  const [inspiringPhrases, setInspiringPhrases] = useState([]);
  const [isKOScreenVisible, setIsKOScreenVisible] = useState(false);
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
        setIsKOScreenVisible(true);
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
        setIsKOScreenVisible,
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

/**
 * Custom hook to access the environment context.
 *
 * This hook provides access to the `EnvironmentContext` and throws an error if
 * used outside of the `EnvironmentProvider`.
 *
 * @returns {Object} - The context values from `EnvironmentContext`, including
 * `genres`, `civilStatus`, `employment`, `category`, `inspiringPhrases`,
 * `isKOScreenVisible`, `setKOScreenVisible`, `isLoading`, `setIsLoading`,
 * `logoIsLoading`, and `setLogoIsLoading`.
 *
 * @throws {Error} - Throws an error if called outside of an `EnvironmentProvider`.
 */
export const useEnvironmentContext = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error("useEnvironment debe usarse dentro de un EnvironmentProvider");
  }
  return context;
};
