import "./Admin.scss";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { InputComponent } from "@components/InputComponent/InputComponent";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { SnackbarComponentTypes } from "@components/SnackbarComponent/SnackbarComponentTypes";
import { UserDataFormComponent } from "@components/UserDataFormComponent/UserDataFormComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { calculateAge } from "@services/utils/utils";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useNavigate } from "react-router-dom";
import { ModalAssignPhraseComponent } from "@components/ModalAssignPhraseComponent/ModalAssignPhraseComponent";

export default function Admin() {
  const [civilStatusValue, setCivilStatusValue] = useState("");
  const [employmentValue, setEmploymentValue] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [genreValue, setGenreValue] = useState("");
  const [isModalAssignPhraseVisible, setIsModalAssignPhraseVisible] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isSnackbarVisibleInspiringPhrase, setIsSnackbarInspiringPhraseVisible] = useState(false);
  const [maxAge, setMaxAge] = useState("");
  const [maxStatus, setMaxStatus] = useState("");
  const [minAge, setMinAge] = useState("");
  const [minStatus, setMinStatus] = useState("");
  const [orderColumn, setOrderColum] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedInspiringPhraseId, setSelectedInspiringPhraseId] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();
  const {
    genres = [],
    civilStatus = [],
    employment = [],
    inspiringPhrases = [],
    setKOScreenVisible,
    setIsLoading,
  } = useEnvironmentContext();

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
  }, [employmentValue, civilStatusValue, genreValue, minAge, maxAge, minStatus, maxStatus]);

  const applyFilter = () => {
    let newFilteredList = userList.filter((user) => {
      let showUser = true;
      if (!isShowByEmployment(user)) {
        showUser = false;
      }
      if (!isShowByCivilStatus(user)) {
        showUser = false;
      }
      if (!isShowByGenre(user)) {
        showUser = false;
      }
      if (!isShowByMinAge(user)) {
        showUser = false;
      }
      if (!isShowByMaxAge(user)) {
        showUser = false;
      }
      if (!isShowByMinStatus(user)) {
        showUser = false;
      }
      if (!isShowByMaxStatus(user)) {
        showUser = false;
      }
      return showUser;
    });
    setFilteredUserList(newFilteredList);
  };

  const isShowByEmployment = (userToFilter) => {
    let employment = userToFilter.extendedUser.employment.employment.toLowerCase();
    return employment === employmentValue.toLowerCase() || employmentValue === "";
  };

  const isShowByCivilStatus = (userToFilter) => {
    let civilStatus = userToFilter.extendedUser.civil_status.status.toLowerCase();
    return civilStatus === civilStatusValue.toLowerCase() || civilStatusValue === "";
  };

  const isShowByGenre = (userToFilter) => {
    let genre = userToFilter.extendedUser.genre.genre.toLowerCase();
    return genre === genreValue.toLowerCase() || genreValue === "";
  };

  const isShowByMinAge = (userToFilter) => {
    let userAge = calculateAge(userToFilter.extendedUser.birthDate);
    return userAge >= minAge || minAge === "";
  };

  const isShowByMaxAge = (userToFilter) => {
    let userAge = calculateAge(userToFilter.extendedUser.birthDate);
    return userAge <= maxAge || maxAge === "";
  };

  const isShowByMinStatus = (userToFilter) => {
    let userStatus = userToFilter.averageScore;
    return userStatus >= minStatus || minStatus === "";
  };

  const isShowByMaxStatus = (userToFilter) => {
    let userStatus = userToFilter.averageScore;
    return userStatus <= maxStatus || maxStatus === "";
  };

  const handleSort = (column) => {
    const newDirection = orderColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setOrderColum(column);
    setSortDirection(newDirection);
    const sortedList = [...filteredUserList].sort((a, b) => {
      const aValue = getSortableValue(a, column);
      const bValue = getSortableValue(b, column);
      if (typeof aValue === "string" && typeof bValue === "string") {
        return newDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return newDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
    });
    setFilteredUserList(sortedList);
  };

  const getSortableValue = (user, column) => {
    switch (column) {
      case "username":
        return user.user.name;
      case "employment":
        return user.extendedUser.employment.employment;
      case "civilStatus":
        return user.extendedUser.civil_status.status;
      case "genre":
        return user.extendedUser.genre.genre;
      case "age":
        return calculateAge(user.extendedUser.birthDate);
      case "genre":
        return user.extendedUser.genre.genre;
      case "score":
        return user.averageScore;
      default:
        return "";
    }
  };

  const handleUserClicked = (userClicked) => {
    setSelectedUser(userClicked);
    setIsModalAssignPhraseVisible(true);
  };

  const handleConfirmAssignPhrase = async (idPhrase) => {
    setSelectedInspiringPhraseId(idPhrase);
  };

  useEffect(() => {
    const updateExtendedUser = async () => {
      if (selectedUser && selectedInspiringPhraseId) {
        selectedUser.extendedUser.idInspiringPhrase = selectedInspiringPhraseId;
        const response = await apiGenericRequest(
          "extended_user/update",
          selectedUser.extendedUser,
          HttpMethod.POST,
          token
        );
        if (response.success) {
          setupSnackbar(
            `Frase inspiradora asignada al usuario ${selectedUser.user.name} correctamente`,
            SnackbarComponentTypes.INFO
          );
        } else {
          setupSnackbar("Error: " + response.error, SnackbarComponentTypes.ERROR);
        }
        setIsModalAssignPhraseVisible(false);
      }
    };
    updateExtendedUser();
  }, [selectedInspiringPhraseId]);

  const handleCancelAssignPhrase = () => {
    setIsModalAssignPhraseVisible(false);
  };

  // Remove Filters
  const removeFilters = () => {
    setEmploymentValue("");
    setCivilStatusValue("");
    setGenreValue("");
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
          className="admin-page-filter-employment"
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
          className="admin-page-filter-civilStatus"
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
        <select
          className="admin-page-filter-genre"
          id="genre"
          value={genreValue}
          onChange={(e) => {
            setGenreValue(e.target.value);
          }}
        >
          <option value="">Por género</option>
          {Array.isArray(genres) &&
            genres.map((genre) => (
              <option key={genre.idGenre} value={genre.genre}>
                {genre.genre}
              </option>
            ))}
        </select>
        <InputComponent
          className="admin-page-filter-minAge"
          name="minAge"
          placeholder="Edad mínima"
          value={minAge}
          onChange={(e) => {
            setMinAge(e.target.value);
          }}
        />
        <InputComponent
          className="admin-page-filter-maxAge"
          name="maxAge"
          placeholder="Edad máxima"
          value={maxAge}
          onChange={(e) => {
            setMaxAge(e.target.value);
          }}
        />
        <InputComponent
          className="admin-page-filter-minStatus"
          name="minStatus"
          placeholder="Estado mínimo"
          value={minStatus}
          onChange={(e) => {
            setMinStatus(e.target.value);
          }}
        />
        <InputComponent
          className="admin-page-filter-maxStatus"
          name="maxStatus"
          placeholder="Estado máximo"
          value={maxStatus}
          onChange={(e) => {
            setMaxStatus(e.target.value);
          }}
        />
        <ButtonComponent type="info-accept" text="Borrar filtros" onClick={removeFilters} width="full" />
      </div>
      <div className="admin-page-user-table">
        <div className="admin-page-user-table-header">
          <UserDataFormComponent isHeader={true} onSort={handleSort} />
        </div>
        {filteredUserList.length > 0 ? (
          filteredUserList.map((user) => (
            <UserDataFormComponent
              key={user.id}
              userRaw={user}
              onUserClicked={(userClicked) => handleUserClicked(userClicked)}
            />
          ))
        ) : (
          <p>No se ha encotrado ningún usuario</p>
        )}
      </div>
      {isSnackbarVisible && (
        <SnackbarComponent message={snackbarMessage} type={snackbarType} onClick={handleClickSnackbar} />
      )}
      {isModalAssignPhraseVisible && (
        <ModalAssignPhraseComponent
          inspiringPhrases={inspiringPhrases}
          onConfirm={(idPhrase) => handleConfirmAssignPhrase(idPhrase)}
          onCancel={handleCancelAssignPhrase}
        />
      )}
    </div>
  );
}
