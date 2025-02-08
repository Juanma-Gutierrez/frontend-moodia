import "./login.scss";
import LoginLottie from "@assets/lotties/LoginLottie.json";
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

export default function Login() {
  const { setToken, setUser, extendedUser, setExtendedUser } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [extendedUserLocal, setExtendedUserLocal] = useState({});

  const modalModel = new ModalModel({
    title: "Iniciar sesión",
    message: "Hay un error en el correo electrónico o en la contraseña. Revisa los datos.",
    button1: "Aceptar",
    type: "warning",
  });

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    setExtendedUserLocal(extendedUser);
  }, [extendedUser]);

  useEffect(() => {
    const formValid = email && password;
    setIsFormValid(formValid);
  }, [email, password]);

  // Modal
  const handleConfirm = () => {
    setIsModalVisible(false);
  };

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
        <ButtonComponent type="info-accept" disabled={!isFormValid} text="Iniciar sesión" onClick={handleLogin} />
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
      <Lottie options={lottieOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
      {isModalVisible && <ModalComponent modalModel={modalModel} onConfirm={handleConfirm} />}
    </div>
  );
}
