import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import "./login.scss";
import { apiGetUserData } from "../../services/apiService/Api";
import { useAuth } from "../../services/context/AuthContext";

export default function Login() {
  const { setRole, setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const token = await apiGetUserData(email, password, setToken, setRole);
    if (token) {
      navigate("/post");
      console.log("navegar a post");
    } else {
      console.log("Error: Token no válido");
    }
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
