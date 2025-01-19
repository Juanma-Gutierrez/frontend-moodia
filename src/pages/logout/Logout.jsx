import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import "./logout.scss";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";

export default function Logout() {
  const { setRole, setToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el token y redirigir al login
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-prompt">
        <h3>¿Quieres cerrar sesión?</h3>
        <div className="button-container">
          <ButtonComponent text="Salir" onClick={handleLogout} type="confirm-accept" />
          <ButtonComponent text="Cancelar" onClick={handleCancel} type="confirm-cancel" />
        </div>
      </div>
    </div>
  );
}
