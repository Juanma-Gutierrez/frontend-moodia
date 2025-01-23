import "./login.scss";
import LoginLottie from "../../assets/lotties/LoginLottie.json";
import Lottie from "react-lottie";
import ModalModel from "../../components/ModalComponent/ModalModel";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { apiGetUserData } from "../../services/apiService/Api";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect, useState } from "react";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";

export default function Login() {
  const { setRole, setToken } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalModel = new ModalModel({
    title: "Iniciar sesión",
    message: "Hay un error en el correo electrónico o en la contraseña. Revisa los datos.",
    button1: "Aceptar",
    type: "warning",
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const formValid = email && password;
    setIsFormValid(formValid);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const token = await apiGetUserData(email, password, setToken, setRole, setIsLoading);
    if (token) {
      let role = localStorage.getItem("role");
      if (role === "Administrador") {
        console.log("navegar a admin");
        navigate("/admin");
      } else if (role === "Usuario") {
        console.log("navegar a post");
        navigate("/post");
      }
    } else {
      console.log("Error: Token no válido");
      setIsModalVisible(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h3>Iniciar sesión</h3>
      <form onSubmit={handleLogin}>
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
        <ButtonComponent type="info" disabled={!isFormValid} text="Iniciar sesión" />
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
      <Lottie
        options={defaultOptions}
        height={CONSTANTS.LOTTIE.LARGE.HEIGHT}
        width={CONSTANTS.LOTTIE.LARGE.WIDTH}
      />
      {isModalVisible && <ModalComponent modalModel={modalModel} onClose={() => setIsModalVisible(false)} />}
    </div>
  );
}
