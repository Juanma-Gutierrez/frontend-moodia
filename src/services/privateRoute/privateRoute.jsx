import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import PropTypes from "prop-types";

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
