import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication-related state and methods.
 *
 * This component manages the authentication state, including the user token,
 * user data, and extended user data. It uses `localStorage` to persist the token
 * across page reloads, ensuring that the user stays authenticated.
 *
 * It provides the following values through the `AuthContext`:
 * - `token`: The user's authentication token.
 * - `setToken`: A method to update the `token` state.
 * - `user`: The basic user data.
 * - `setUser`: A method to update the `user` state.
 * - `extendedUser`: Additional user details.
 * - `setExtendedUser`: A method to update the `extendedUser` state.
 *
 * It also has the following side effects:
 * - On mount, it retrieves the token from `localStorage` (if available)
 *   and sets it in the `token` state.
 * - It listens for changes in the `token` state and persists it in `localStorage`
 *   when updated.
 *
 * @param {Object} props - The props for this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {JSX.Element} - The `AuthContext.Provider` that wraps the children components.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [extendedUser, setExtendedUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        extendedUser,
        setExtendedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access the authentication context.
 *
 * This hook provides access to the `AuthContext` and throws an error if
 * used outside of the `AuthContext.Provider`.
 *
 * @returns {Object} - The context values from `AuthContext`, including `token`,
 * `setToken`, `user`, `setUser`, `extendedUser`, and `setExtendedUser`.
 *
 * @throws {Error} - Throws an error if called outside of an `AuthContext.Provider`.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthContextProvider");
  }
  return context;
};
