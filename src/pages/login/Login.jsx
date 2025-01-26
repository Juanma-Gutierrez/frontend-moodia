import "./login.scss";
import LoginLottie from "../../assets/lotties/LoginLottie.json";
import Lottie from "react-lottie";
import ModalModel from "../../components/ModalComponent/ModalModel";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "../../constants/Constants";
import { HttpMethod } from "../../services/apiService/HttpMethod";
import { Link, useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "../../services/apiService/ApiGenericRequest";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect, useState } from "react";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";

export default function Login() {
  const { setToken, setUser, extendedUser, setExtendedUser } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();
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

  const defaultOptions = {
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

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

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
      <Lottie options={defaultOptions} height={CONSTANTS.LOTTIE.LARGE.HEIGHT} width={CONSTANTS.LOTTIE.LARGE.WIDTH} />
      {isModalVisible && <ModalComponent modalModel={modalModel} onClose={() => setIsModalVisible(false)} />}
    </div>
  );
}
