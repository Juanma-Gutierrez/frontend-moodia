import "./logout.scss";
import LogoutLottie from "@assets/lotties/LogoutLottie.json";
import Lottie from "react-lottie";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "@constants/Constants";
import { useAuthContext } from "@services/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setToken, setUser, setExtendedUser } = useAuthContext();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LogoutLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleLogout = () => {
    // Limpiar el token y redirigir al login
    setToken(null);
    setUser(null);
    setExtendedUser(null);
    localStorage.removeItem("token");
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
          <ButtonComponent text="Salir" type="confirm-accept" onClick={handleLogout} />
          <ButtonComponent text="Cancelar" type="confirm-cancel" onClick={handleCancel} />
        </div>
        <Lottie options={defaultOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
      </div>
    </div>
  );
}
