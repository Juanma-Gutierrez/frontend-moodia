import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiService/registerUser";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";
import { useEffect, useState } from "react";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import ModalModel from "../../components/ModalComponent/ModalModel";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";

export default function Register() {
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idCivilStatus, setIdCivilStatus] = useState("");
  const [idEmployment, setIdEmployment] = useState("");
  const [idGenre, setIdGenre] = useState("");
  const [idRole] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { genres = [], civilStatus = [], employment = [] } = useEnvironmentContext();
  const { setIsLoading } = useIsLoadingContext();
  const { setToken, setRole } = useAuthContext();

  const modalModel = new ModalModel({
    title: "Registro de usuario",
    message: "¿Seguro que los datos son correctos y quieres continuar?",
    button1: "Registrar",
    button2: "Cancelar",
    type: "confirm",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Error: Las contraseñas no coinciden");
      return;
    }

    setModalOpen(true);
  };

  useEffect(() => {
    const formValid =
      name &&
      email &&
      password &&
      confirmPassword &&
      birthDate &&
      idCivilStatus &&
      idEmployment &&
      idGenre &&
      password === confirmPassword;
    setIsFormValid(formValid);
  }, [name, email, password, confirmPassword, birthDate, idCivilStatus, idEmployment, idGenre]);

  const handleModalClose = async (result) => {
    setModalOpen(false);
    setModalResult(result);

    if (result) {
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
        console.log("Registro exitoso. Redirigiendo...");
        navigate("/post");
        const token = localStorage.getItem("token");
        setToken(token);
      } else {
        console.error("Error en el registro:", registerResponse.error);
      }
      setIsLoading(false);
    } else {
      // TODO: Añadir un snackbar informativo
      console.log("El usuario canceló el registro. ");
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
          <select id="civilStatus" value={idCivilStatus} onChange={(e) => setIdCivilStatus(e.target.value)} required>
            <option value="">Selecciona tu estado civil</option>
            {Array.isArray(civilStatus) &&
              civilStatus.map((status) => (
                <option key={status.idCivilStatus} value={status.idCivilStatus}>
                  {status.status}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select id="genre" value={idGenre} onChange={(e) => setIdGenre(e.target.value)} required>
            <option value="">Selecciona tu género</option>
            {Array.isArray(genres) &&
              genres.map((genre) => (
                <option key={genre.idGenre} value={genre.idGenre}>
                  {genre.genre}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select id="employment" value={idEmployment} onChange={(e) => setIdEmployment(e.target.value)} required>
            <option value="">Selecciona tu situación laboral</option>
            {Array.isArray(employment) &&
              employment.map((employment) => (
                <option key={employment.idEmployment} value={employment.idEmployment}>
                  {employment.employment}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" value={idRole} />
        <ButtonComponent type="info" disabled={!isFormValid} text="Registrar" />
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
      {modalOpen && <ModalComponent modalModel={modalModel} onClose={handleModalClose} />}
    </div>
  );
}
