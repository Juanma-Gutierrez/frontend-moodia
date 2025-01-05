import { API_URL } from "../../config/config";
import { apiGetMe, apiGetToken } from "./Api";

// Función principal de registro
export const registerUser = async (
  name,
  email,
  password,
  passwordConfirmation,
  birthDate,
  idCivilStatus,
  idGenre,
  idRole,
  idEmployment,
  setRole
) => {
  try {
    // Paso 1: Registrar al usuario
    await registerStepRegisterUser(name, email, password, passwordConfirmation);
    // Paso 2: Iniciar sesión automáticamente después del registro
    const tokenValue = await apiGetToken(email, password);
    // Paso 3: Obtener los datos del usuario
    const userDataWithDetails = await apiGetMe(tokenValue.token);
    // Paso 4: Grabar en la tabla extended_user con el id recibido
    console.log("userdatawithdetails", userDataWithDetails);
    await registerStepExtendedUser(userDataWithDetails.id, birthDate, idCivilStatus, idGenre, idRole, idEmployment, setRole);
    return { success: true, userData: userDataWithDetails, token: tokenValue.token };
  } catch (error) {
    console.error("Error en el registro:", error.message);
    return { success: false, error: error.message };
  }
};

// Paso 1: Registrar al usuario
const registerStepRegisterUser = async (name, email, password, passwordConfirmation) => {
  const payload = {
    name: name,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };

  const response = await fetch(API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error en el registro paso 1:", errorData);
    throw new Error("Error en el registro paso 1");
  }

  const data = await response.json();
  console.log("Usuario registrado correctamente:", data);
  return data;
};

// Paso 4: Grabar en la tabla extended_user
const registerStepExtendedUser = async (idExtendedUser, birthDate, idCivilStatus, idGenre, idRole, idEmployment, setRole) => {
  const payload = {
    idExtendedUser: idExtendedUser,
    birthDate: birthDate,
    idCivilStatus: idCivilStatus,
    idGenre: idGenre,
    idRole: idRole,
    idEmployment: idEmployment,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  console.log("Datos de extended_user", payload);
  const response = await fetch(API_URL + "/extended_user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("Datos de extended_user guardados correctamente", payload);
    setRole("Usuario");
  } else {
    const errorData = await response.json();
    console.error("Error al guardar los datos extendidos:", errorData);
    throw new Error("Error al guardar los datos extendidos");
  }

  const data = await response.json();
  console.log("Datos de extended_user guardados correctamente:", data);
};
