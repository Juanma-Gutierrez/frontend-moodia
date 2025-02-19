import "./UserDataFormComponent.scss";
import PropTypes from "prop-types";
import { calculateAge } from "@services/utils/utils";

/**
 * UserDataFormComponent
 *
 * A component that displays a row of user data. It is used to either render a header row with column titles
 * or a data row with individual user information. The component also provides sorting functionality
 * when the header elements are clicked, and a click action for user rows.
 *
 * @param {Object} userRaw - The raw user data, including personal and employment details.
 * @param {boolean} isHeader - Indicates if the component should render the header row (true) or user data row (false).
 * @param {Function} onSort - A callback function that is triggered when a header is clicked for sorting.
 * @param {Function} onUserClicked - A callback function that is triggered when a user row is clicked.
 *
 * @returns {JSX.Element} - The JSX representation of either a header row or a user data row.
 */
export const UserDataFormComponent = ({ userRaw, isHeader, onSort, onUserClicked }) => {
  const handleUser = () => {
    if (onUserClicked) onUserClicked(userRaw);
  };

  /**
   * handleSort
   *
   * Triggered when a column header is clicked. It calls the `onSort` function passed as a prop,
   * passing the sorting criteria (column name) as an argument.
   *
   * @param {string} sort - The criteria by which the data should be sorted.
   */
  const handleSort = (sort) => {
    if (onSort) onSort(sort);
  };

  /**
   * If `isHeader` is true, the component will render the table header, allowing sorting.
   * Otherwise, it will render a data row with user information.
   */
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

  /**
   * Extract values from `userRaw` for display in the data row.
   */
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
