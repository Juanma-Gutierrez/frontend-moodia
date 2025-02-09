import { HttpMethod } from "@services/apiService/HttpMethod";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { SnackbarComponentTypes } from "@components/SnackbarComponent/SnackbarComponentTypes";
import { UserDataFormComponent } from "@components/UserDataFormComponent/UserDataFormComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { setLogoIsLoading } = useEnvironmentContext();
  const { token } = useAuthContext();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLogoIsLoading(true);
        const body = {
          role: "Administrador",
        };

        const response = await apiGenericRequest("user/get-all", body, HttpMethod.POST, token);
        console.log(response.data.data);
        if (response.success) {
          setUserList(response.data.data);
        } else {
          setupSnackbar("Error reading users", SnackbarComponentTypes.ERROR);
        }
        setLogoIsLoading(false);
      } catch (error) {
        // TODO: Mostrar modal con info del error antes de navegar
        setLogoIsLoading(true);
        navigate("/login");
      }
    };
    fetchUsers();
  }, []);

  // Snackbar
  const setupSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setIsSnackbarVisible(true);
  };
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <div>
      <h1>Administración</h1>
      {userList.length > 0 ? userList.map((user) => <UserDataFormComponent userRaw={user} />) : <p>No users found.</p>}
      {isSnackbarVisible && <SnackbarComponent message={snackbarMessage} type="error" onClick={handleClickSnackbar} />}
    </div>
  );
}
