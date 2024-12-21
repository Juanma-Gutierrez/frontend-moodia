import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiService/registerUser";
import "./register.scss";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Error: Las contraseñas no coinciden");
      return;
    }

    const registerResponse = await registerUser(name, email, password, confirmPassword);

    if (registerResponse.success) {
      console.log("Registro y login exitosos. Redirigiendo a /post...");
      navigate("/post");
    } else {
      console.error("Error en el registro o inicio de sesión:", registerResponse.error);
    }
  };

  return (
    <div className="register-container">
      <h3>Crear Cuenta</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
