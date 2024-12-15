import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth(); // Accede al token desde el contexto
  const location = useLocation();

  // Verifica si hay un token
  const hasToken = token || localStorage.getItem("token");

  if (!hasToken) {
    // Si no hay token, redirige a /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el token está presente, renderiza el contenido de la ruta protegida
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
