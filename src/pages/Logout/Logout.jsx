import "./Logout.scss";
import LogoutLottie from "@assets/lotties/LogoutLottie.json";
import Lottie from "react-lottie";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "@constants/Constants";
import { useAuthContext } from "@services/Context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Logout Component
 * @returns {JSX.Element} - Returns the Logout component with logout functionality, animation, and confirmation buttons.
 */
export default function Logout() {
  const { setToken, setUser, setExtendedUser } = useAuthContext();
  const navigate = useNavigate();

  /**
   * Lottie Animation Options for logout
   * @returns {Object} - Configuration for the Lottie animation used on the logout screen.
   */
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: LogoutLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  /**
   * Handles the logout process
   * @returns {void} - Clears the user session, removes the token, and redirects to the login page.
   */
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setExtendedUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  /**
   * Cancels the logout action and redirects the user to the home page
   * @returns {void} - Redirects to the home page if the user cancels the logout.
   */
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-prompt">
        <h3>¿Quieres cerrar sesión?</h3>
      </div>
      <Lottie options={lottieOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
      <div className="button-container">
        <ButtonComponent text="Salir" type="confirm-accept" onClick={handleLogout} />
        <ButtonComponent text="Cancelar" type="confirm-cancel" onClick={handleCancel} />
      </div>
    </div>
  );
}
