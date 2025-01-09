import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiService/registerUser";
import { useAuthContext } from "../../services/context/AuthContext";
import { useState } from "react";
import { USER_ATTRIBUTES } from "../../config/config";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";

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
  const { setToken, setRole } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();
  const { genres, civilStatus, employment } = useEnvironmentContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Error: Las contraseñas no coinciden");
      return;
    }
    setIsLoading(true);
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
      idEmployment,
      setRole
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
    setIsLoading(false);
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
          <select id="civilStatus" value={idCivilStatus} onChange={(e) => setIdCivilStatus(e.target.value)} required>
            <option value="">Selecciona tu estado civil</option>
            {civilStatus.map((status) => (
              <option key={status.idCivilStatus} value={status.idCivilStatus}>
                {status.status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select id="genre" value={idGenre} onChange={(e) => setIdGenre(e.target.value)} required>
            <option value="">Selecciona tu género</option>
            {genres.map((genre) => (
              <option key={genre.idGenre} value={genre.idGenre}>
                {genre.genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select id="employment" value={idEmployment} onChange={(e) => setIdEmployment(e.target.value)} required>
            <option value="">Selecciona tu situación laboral</option>
            {employment.map((employment) => (
              <option key={employment.idEmployment} value={employment.idEmployment}>
                {employment.employment}
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
