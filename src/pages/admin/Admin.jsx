import "./Admin.scss";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { InputComponent } from "@components/InputComponent/InputComponent";
import { ModalAssignPhraseComponent } from "@components/ModalAssignPhraseComponent/ModalAssignPhraseComponent";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { SnackbarComponentTypes } from "@components/SnackbarComponent/SnackbarComponentTypes";
import { UserDataFormComponent } from "@components/UserDataFormComponent/UserDataFormComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { calculateAge } from "@services/utils/utils";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useNavigate } from "react-router-dom";

/**
 * Main component function for Admin panel
 * @returns {JSX.Element} - Returns the Admin component with user management functionality.
 */
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

  /**
   * Fetches users from the API and sets them in the state
   * @returns {void} - Fetches the user data and updates the state.
   */
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

  /**
   * Sets up a snackbar message with a specific type
   * @param {string} message - The message to display in the snackbar.
   * @param {string} type - The type of message (e.g., "success", "error").
   * @returns {void} - Displays the snackbar with the message.
   */
  const setupSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setIsSnackbarVisible(true);
  };

  /**
   * Handles the snackbar click to hide it
   * @returns {void} - Closes the snackbar when clicked.
   */
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  /**
   * Applies the selected filters to the user list
   * @returns {void} - Filters the users based on selected criteria.
   */
  useEffect(() => {
    applyFilter();
  }, [employmentValue, civilStatusValue, genreValue, minAge, maxAge, minStatus, maxStatus]);

  /**
   * Filters users based on the applied filters
   * @returns {void} - Updates the user list based on the filter conditions.
   */
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

  /**
   * Checks if the user's employment matches the selected filter
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the employment filter.
   */
  const isShowByEmployment = (userToFilter) => {
    let employment = userToFilter.extendedUser.employment.employment.toLowerCase();
    return employment === employmentValue.toLowerCase() || employmentValue === "";
  };

  /**
   * Checks if the user's civil status matches the selected filter
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the civil status filter.
   */
  const isShowByCivilStatus = (userToFilter) => {
    let civilStatus = userToFilter.extendedUser.civil_status.status.toLowerCase();
    return civilStatus === civilStatusValue.toLowerCase() || civilStatusValue === "";
  };

  /**
   * Checks if the user's genre matches the selected filter
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the genre filter.
   */
  const isShowByGenre = (userToFilter) => {
    let genre = userToFilter.extendedUser.genre.genre.toLowerCase();
    return genre === genreValue.toLowerCase() || genreValue === "";
  };

  /**
   * Checks if the user's age is greater than or equal to the minimum age
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the minimum age filter.
   */
  const isShowByMinAge = (userToFilter) => {
    let userAge = calculateAge(userToFilter.extendedUser.birthDate);
    return userAge >= minAge || minAge === "";
  };

  /**
   * Checks if the user's age is less than or equal to the maximum age
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the maximum age filter.
   */
  const isShowByMaxAge = (userToFilter) => {
    let userAge = calculateAge(userToFilter.extendedUser.birthDate);
    return userAge <= maxAge || maxAge === "";
  };

  /**
   * Checks if the user's status is greater than or equal to the minimum status
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the minimum status filter.
   */
  const isShowByMinStatus = (userToFilter) => {
    let userStatus = userToFilter.averageScore;
    return userStatus >= minStatus || minStatus === "";
  };

  /**
   * Checks if the user's status is less than or equal to the maximum status
   * @param {Object} userToFilter - The user object to check.
   * @returns {boolean} - Returns true if the user matches the maximum status filter.
   */
  const isShowByMaxStatus = (userToFilter) => {
    let userStatus = userToFilter.averageScore;
    return userStatus <= maxStatus || maxStatus === "";
  };

  /**
   * Handles sorting of users by the selected column
   * @param {string} column - The column by which to sort the users.
   * @returns {void} - Sorts the users based on the selected column.
   */
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

  /**
   * Gets the value of a specific column to be used for sorting
   * @param {Object} user - The user object to get the value from.
   * @param {string} column - The column to get the value for.
   * @returns {string|number} - Returns the value of the column to use for sorting.
   */
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
      case "score":
        return user.averageScore;
      default:
        return "";
    }
  };

  /**
   * Handles when a user is clicked to show the phrase assignment modal
   * @param {Object} userClicked - The user object that was clicked.
   * @returns {void} - Opens the phrase assignment modal for the selected user.
   */
  const handleUserClicked = (userClicked) => {
    setSelectedUser(userClicked);
    setIsModalAssignPhraseVisible(true);
  };

  /**
   * Confirms assignment of an inspiring phrase to a user
   * @param {string} idPhrase - The ID of the phrase to assign.
   * @returns {void} - Assigns the selected phrase to the user.
   */
  const handleConfirmAssignPhrase = async (idPhrase) => {
    setSelectedInspiringPhraseId(idPhrase);
  };

  /**
   * Updates the extended user data with the selected inspiring phrase
   * @returns {void} - Updates the user data with the selected phrase.
   */
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

  /**
   * Handles cancelation of the phrase assignment
   * @returns {void} - Closes the phrase assignment modal without saving changes.
   */
  const handleCancelAssignPhrase = () => {
    setIsModalAssignPhraseVisible(false);
  };

  /**
   * Removes all applied filters and resets the user list
   * @returns {void} - Resets all filters and updates the user list.
   */
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
