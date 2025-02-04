import "./register.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export default function Register() {
  const [birthDate, setBirthDate] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [idCivilStatus, setIdCivilStatus] = useState("");
  const [idEmployment, setIdEmployment] = useState("");
  const [idGenre, setIdGenre] = useState("");
  const [idRole] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { genres = [], civilStatus = [], employment = [], setKOScreenVisible, setIsLoading } = useEnvironmentContext();
  const { setUser, setExtendedUser, setToken } = useAuthContext();

  const modalModel = new ModalModel({
    title: "Registro de usuario",
    message: "¿Seguro que los datos son correctos y quieres continuar?",
    button1: "Registrar",
    button2: "Cancelar",
    type: "confirm",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  useEffect(() => {
    const formValid =
      name &&
      email &&
      password &&
      password_confirmation &&
      birthDate &&
      idCivilStatus &&
      idEmployment &&
      idGenre &&
      password === password_confirmation;
    setIsFormValid(formValid);
  }, [name, email, password, password_confirmation, birthDate, idCivilStatus, idEmployment, idGenre]);

  const handleConfirm = async () => {
    setIsLoading(true);
    const userData = {
      name,
      email,
      password,
      password_confirmation,
      birthDate,
      idCivilStatus,
      idGenre,
      idRole,
      idEmployment,
    };
    console.log("Datos enviados para el registro:", userData);
    const response = await apiGenericRequest("auth/register", userData);
    if (response.success) {
      setToken(response.data.token);
      setUser(response.data.user);
      setExtendedUser(response.data.extendedUser);
      localStorage.setItem("token", response.data.token);
      // TODO: MOSTRAR MENSAJE CON INFO REGISTRO CORRECTO
      navigate("/post");
    } else {
      setKOScreenVisible(true);
      console.error("Error en el registro:", registerResponse.error);
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    console.log("Modal cerrada");
    setIsModalVisible(false);
  };

  return (
    <div className="register-container">
      <h3>Crear Cuenta</h3>
      <form >
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
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
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
        <ButtonComponent type="info" disabled={!isFormValid} text="Registrar" onClick={handleRegister}/>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
      {isModalVisible && (
        <ModalComponent modalModel={modalModel} onConfirm={handleConfirm} onCancel={handleCloseModal} />
      )}
    </div>
  );
}
