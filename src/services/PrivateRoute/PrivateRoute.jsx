import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@services/Context/AuthContext";
import PropTypes from "prop-types";

/**
 * A wrapper component that manages access to private routes based on authentication.
 *
 * This component checks whether the user is authenticated by verifying the presence of a token.
 * - If the route is public and the user is authenticated, it redirects to the post page.
 * - If the route is not public and the user is not authenticated, it redirects to the login page.
 * - If none of the above conditions are met, it renders the children components (i.e., the protected content).
 *
 * @param {React.ReactNode} children - The child components to render if the user is authenticated and allowed to access the route.
 * @param {boolean} [isPublic=false] - Flag to indicate if the route is public. Defaults to false (protected route).
 *
 * @returns {React.ReactNode} - Returns the children components if the user is allowed to access the route,
 *                             otherwise, it redirects to the login page or another route as needed.
 */
const PrivateRoute = ({ children, isPublic = false }) => {
  const { token } = useAuthContext();
  const location = useLocation();
  const hasToken = token || localStorage.getItem("token");

  if (isPublic && hasToken) {
    return <Navigate to="/post" replace />;
  }

  if (!hasToken && !isPublic) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isPublic: PropTypes.bool,
};

export default PrivateRoute;
