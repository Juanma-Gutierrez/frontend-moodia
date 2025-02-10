import "./Admin.scss";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { InputComponent } from "@components/InputComponent/InputComponent";
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
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [employmentValue, setEmploymentValue] = useState("");
  const [civilStatusValue, setCivilStatusValue] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minStatus, setMinStatus] = useState("");
  const [maxStatus, setMaxStatus] = useState("");
  const { genres = [], civilStatus = [], employment = [], setKOScreenVisible, setIsLoading } = useEnvironmentContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLogoIsLoading(true);
        const body = {
          role: "Administrador",
        };

        const response = await apiGenericRequest("user/get-all", body, HttpMethod.POST, token);
        if (response.success) {
          setUserList(response.data.data);
          setFilteredUserList(response.data.data);
        } else {
          setupSnackbar("Error reading users", SnackbarComponentTypes.ERROR);
        }
        setLogoIsLoading(false);
      } catch (error) {
        setLogoIsLoading(true);
        navigate("/login");
      }
    };
    fetchUsers();
  }, [token, navigate, setLogoIsLoading]);

  // Snackbar
  const setupSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setIsSnackbarVisible(true);
  };
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  useEffect(() => {
    applyFilter();
  }, [employmentValue, civilStatusValue]);

  const applyFilter = () => {
    let newFilteredList = userList.filter((user) => {
      let showUser = true;
      if (!isShowByEmployment(user)) {
        showUser = false;
      }
      if (!isShowByCivilStatus(user)) {
        showUser = false;
      }
      return showUser;
    });
    setFilteredUserList(newFilteredList);
  };

  const isShowByEmployment = (userToFilter) => {
    return (
      userToFilter.extendedUser.employment.employment.toLowerCase() === employmentValue.toLowerCase() ||
      employmentValue === ""
    );
  };

  const isShowByCivilStatus = (userToFilter) => {
    console.log(userToFilter.extendedUser.civil_status.status.toLowerCase());
    console.log(civilStatusValue.toLowerCase());
    return (
      userToFilter.extendedUser.civil_status.status.toLowerCase() === civilStatusValue.toLowerCase() ||
      civilStatusValue === ""
    );
  };

  //   if (civilStatusValue) {
  //     filteredUsers = filteredUsers.filter((user) =>
  //       user.extendedUser.civil_status.status.toLowerCase().includes(civilStatusValue.toLowerCase())
  //     );
  //   }

  //   if (minAge) {
  //     filteredUsers = filteredUsers.filter((user) => user.age >= parseInt(minAge));
  //   }

  //   if (maxAge) {
  //     filteredUsers = filteredUsers.filter((user) => user.age <= parseInt(maxAge));
  //   }

  //   // Filtrar por estado mínimo
  //   if (minStatus) {
  //     filteredUsers = filteredUsers.filter((user) => user.extendedUser.status >= parseInt(minStatus));
  //   }

  //   // Filtrar por estado máximo
  //   if (maxStatus) {
  //     filteredUsers = filteredUsers.filter((user) => user.extendedUser.status <= parseInt(maxStatus));
  //   }

  //   setFilteredUserList(filteredUsers);
  // };

  // Remove Filters
  const removeFilters = () => {
    setEmploymentValue("");
    setCivilStatusValue("");
    setMinAge("");
    setMaxAge("");
    setMinStatus("");
    setMaxStatus("");
    setFilteredUserList(userList);
  };

  return (
    <div className="admin-page-container">
      <h1>Administración</h1>
      <div className="admin-page-table-filter">
        <select
          id="employment"
          value={employmentValue}
          onChange={(e) => {
            setEmploymentValue(e.target.value);
          }}
        >
          <option value="">Por empleo</option>
          {Array.isArray(employment) &&
            employment.map((employment) => (
              <option key={employment.idEmployment} value={employment.employment}>
                {employment.employment}
              </option>
            ))}
        </select>
        <select
          id="civilStatus"
          value={civilStatusValue}
          onChange={(e) => {
            setCivilStatusValue(e.target.value);
          }}
        >
          <option value="">Por estado civil</option>
          {Array.isArray(civilStatus) &&
            civilStatus.map((status) => (
              <option key={status.idCivilStatus} value={status.status}>
                {status.status}
              </option>
            ))}
        </select>
        <InputComponent
          name="minAge"
          placeholder="Edad mínima"
          value={minAge}
          onChange={(e) => {
            setMinAge(e.target.value);
          }}
        />
        <InputComponent
          name="maxAge"
          placeholder="Edad máxima"
          value={maxAge}
          onChange={(e) => {
            setMaxAge(e.target.value);
          }}
        />
        <InputComponent
          name="minStatus"
          placeholder="Estado mínimo"
          value={minStatus}
          onChange={(e) => {
            setMinStatus(e.target.value);
          }}
        />
        <InputComponent
          name="maxStatus"
          placeholder="Estado máximo"
          value={maxStatus}
          onChange={(e) => {
            setMaxStatus(e.target.value);
          }}
        />
        <ButtonComponent type="info-accept" text="Borrar filtros" onClick={removeFilters} />
      </div>
      <div className="admin-page-user-table">
        <div className="admin-page-user-table-header">
          <UserDataFormComponent isHeader={true} />
        </div>
        {filteredUserList.length > 0 ? (
          filteredUserList.map((user) => <UserDataFormComponent key={user.id} userRaw={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
      {isSnackbarVisible && (
        <SnackbarComponent message={snackbarMessage} type={snackbarType} onClick={handleClickSnackbar} />
      )}
    </div>
  );
}
