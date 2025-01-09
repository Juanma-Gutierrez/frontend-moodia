import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import "./login.scss";
import { apiGetUserData } from "../../services/apiService/Api";
import { useAuthContext } from "../../services/context/AuthContext";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";

export default function Login() {
  const { setRole, setToken } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h3>Iniciar Sesión</h3>
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
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}
