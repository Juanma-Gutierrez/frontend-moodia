import "./login.scss";
import LoginLottie from "@assets/Lotties/LoginLottie.json";
import Lottie from "react-lottie";
import ModalModel from "@components/ModalComponent/ModalModel";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "@constants/Constants";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "@assets/Icons/NavigationBarIcons/LogoIcon";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

/**
 * Login Component
 * @returns {JSX.Element} - Returns the Login component with login functionality, form validation, and error handling.
 */
export default function Login() {
  const { setToken, setUser, extendedUser, setExtendedUser } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [extendedUserLocal, setExtendedUserLocal] = useState({});

  /**
   * Modal Model for error display
   * @returns {Object} - Configuration object for the modal shown when login fails.
   */
  const modalModel = new ModalModel({
    title: "Iniciar sesión",
    message: "Hay un error en el correo electrónico o en la contraseña. Revisa los datos.",
    button1: "Aceptar",
    type: "warning",
  });

  /**
   * Lottie Animation Options
   * @returns {Object} - Configuration for the Lottie animation used on the login screen.
   */
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  /**
   * Effect to set token from localStorage if it exists
   * @returns {void} - Sets the token from localStorage when the component mounts.
   */
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  /**
   * Effect to update extended user information in local state
   * @returns {void} - Updates the extended user state when `extendedUser` changes.
   */
  useEffect(() => {
    setExtendedUserLocal(extendedUser);
  }, [extendedUser]);

  /**
   * Effect to validate the login form
   * @returns {void} - Sets form validity based on whether the email and password fields are filled.
   */
  useEffect(() => {
    const formValid = email && password;
    setIsFormValid(formValid);
  }, [email, password]);

  /**
   * Handles the confirmation action for the error modal
   * @returns {void} - Closes the modal when the user confirms.
   */
  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  /**
   * Handles the login process
   * @param {Event} e - The form submission event.
   * @returns {void} - Sends login request, processes response, and redirects based on user role.
   */
  const handleLogin = async (e) => {
    setLogoIsLoading(true);
    e.preventDefault();

    const body = {
      email,
      password,
    };
    const responseToken = await apiGenericRequest("auth/login", body);
    switch (responseToken.success) {
      case true: {
        const responseUser = await apiGenericRequest("auth/me", null, HttpMethod.POST, responseToken.data.access_token);
        const responseExtendedUser = await apiGenericRequest(
          `extended_user/${responseUser.data.id}`,
          null,
          HttpMethod.POST,
          responseToken.data.access_token
        );
        if (responseUser.data) {
          setToken(responseToken.data.access_token);
          setUser(responseUser.data);
          setExtendedUser(responseExtendedUser.data);
          if (responseExtendedUser.data.idRole === 1) {
            navigate("/post");
          } else if (responseExtendedUser.data.idRole === 2) {
            navigate("/admin");
          }
        }
        break;
      }
      case false: {
        console.log("Error: Token no válido");
        setIsModalVisible(true);
        break;
      }
    }
    setLogoIsLoading(false);
  };

  const logoColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");

  return (
    <div className="login-container">
      <div className="login-title">
        <div className="logo">
          <LogoIcon className="logo" size="64" stroke={logoColor} />
        </div>
        <h1>Moodia</h1>
      </div>
      <h3>Iniciar sesión</h3>
      <form>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Lottie options={lottieOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
        <ButtonComponent type="info-accept" disabled={!isFormValid} text="Iniciar sesión" onClick={handleLogin} />
        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
      {isModalVisible && <ModalComponent modalModel={modalModel} onConfirm={handleConfirm} />}
    </div>
  );
}
