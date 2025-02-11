import "./UserDataFormComponent.scss";
import PropTypes from "prop-types";
import { calculateAge } from "@services/utils/utils";

export const UserDataFormComponent = ({ userRaw, isHeader, onSort, onUserClicked }) => {
  const handleUser = () => {
    console.log("handleUser");
    if (onUserClicked) onUserClicked(userRaw);
  };

  const handleSort = (sort) => {
    if (onSort) onSort(sort);
  };

  if (isHeader) {
    return (
      <div className="user-data-row">
        <div className="user-data-username user-data-header" onClick={() => handleSort("username")}>
          Nombre
        </div>
        <div className="user-data-employment user-data-header" onClick={() => handleSort("employment")}>
          Empleo
        </div>
        <div className="user-data-civilStatus user-data-header" onClick={() => handleSort("civilStatus")}>
          Estado Civil
        </div>
        <div className="user-data-age-data user-data-header" onClick={() => handleSort("age")}>
          Edad
        </div>
        <div className="user-data-genre-data user-data-header" onClick={() => handleSort("genre")}>
          Género
        </div>
        <div className="user-data-score user-data-header" onClick={() => handleSort("score")}>
          Estado
        </div>
      </div>
    );
  }

  const username = userRaw.user.name;
  const employment = userRaw.extendedUser.employment.employment;
  const civilStatus = userRaw.extendedUser.civil_status.status;
  const age = calculateAge(userRaw.extendedUser.birthDate);
  const genre = userRaw.extendedUser.genre.genre;
  const score = userRaw.averageScore;

  return (
    <div className={`user-data-row ${score < 2 && score != 0 ? "user-danger" : ""}`} onClick={() => handleUser()}>
      <div className="user-data-username">{username}</div>
      <div className="user-data-employment">{employment}</div>
      <div className="user-data-civilStatus">{civilStatus}</div>
      <div className="user-data-age">{age}</div>
      <div className="user-data-genre">{genre}</div>
      <div className="user-data-score">{score}</div>
    </div>
  );
};

UserDataFormComponent.propTypes = {
  userRaw: PropTypes.object,
  isHeader: PropTypes.bool,
};
