// import PropTypes from "prop-types";
// import { useState, useContext, createContext } from "react";

// const IsLoadingContext = createContext();

// export const IsLoadingProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</IsLoadingContext.Provider>;
// };

// IsLoadingProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useIsLoadingContext = () => {
//   const context = useContext(IsLoadingContext);
//   if (!context) {
//     throw new Error("useIsLoading debe usarse dentro de un IsLoadingProvider");
//   }
//   return context;
// };
