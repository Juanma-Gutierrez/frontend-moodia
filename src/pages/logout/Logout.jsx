import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/context/AuthContext";
import "./logout.scss";

export default function Logout() {
  const { setRole, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el token y redirigir al login
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login"); // Redirige al login
  };

  const handleCancel = () => {
    navigate("/"); // Si el usuario cancela, lo redirige a la página principal
  };

  return (
    <div className="logout-container">
      <div className="logout-prompt">
        <h3>¿Quieres cerrar sesión?</h3>
        <div className="button-container">
          <button onClick={handleLogout}>Sí, quiero cerrar sesión</button>
          <button onClick={handleCancel} className="logout-cancel">
            No, volver
          </button>
        </div>
      </div>
    </div>
  );
}
