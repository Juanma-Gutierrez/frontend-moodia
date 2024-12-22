import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiService/registerUser";
import { useAuth } from "../../services/context/AuthContext";
import { useState } from "react";
import { userAttributes } from "../../config/config";

export default function Register() {
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idCivilStatus, setIdCivilStatus] = useState("");
  const [idEmployment, setIdEmployment] = useState("");
  const [idGenre, setIdGenre] = useState("");
  const [idRole] = useState(1);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Error: Las contraseñas no coinciden");
      return;
    }

    const userData = {
      name,
      email,
      password,
      confirmPassword,
      birthDate,
      idCivilStatus,
      idGenre,
      idRole,
      idEmployment,
    };

    console.log("Datos enviados para el registro:", userData);

    const registerResponse = await registerUser(
      name,
      email,
      password,
      confirmPassword,
      birthDate,
      idCivilStatus,
      idGenre,
      idRole,
      idEmployment
    );

    if (registerResponse.success) {
      console.log(registerResponse.success);
      console.log("Registro y login exitosos. Redirigiendo a /post...");
      navigate("/post");
      const token = localStorage.getItem("token");
      setToken(token);
    } else {
      console.error("Error en el registro:", registerResponse.error);
    }
  };

  return (
    <div className="register-container">
      <h3>Crear Cuenta</h3>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
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
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <div>
          <label htmlFor="civilStatus">Estado civil:</label>
          <select id="civilStatus" value={idCivilStatus} onChange={(e) => setIdCivilStatus(e.target.value)} required>
            <option value="">Selecciona tu estado civil</option>
            {userAttributes.civilStatus.map((status, index) => (
              <option key={index} value={index + 1}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="genre">Género:</label>
          <select id="genre" value={idGenre} onChange={(e) => setIdGenre(e.target.value)} required>
            <option value="">Selecciona tu género</option>
            {userAttributes.genre.map((genre, index) => (
              <option key={index} value={index + 1}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="genre">Situación laboral:</label>
          <select value={idEmployment} onChange={(e) => setIdEmployment(e.target.value)} required>
            <option value="">Selecciona tu situación laboral</option>
            {userAttributes.employment.map((employment, index) => (
              <option key={index} value={index + 1}>
                {employment}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" value={idRole} />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}
