import "./UserDataFormComponent.scss";
import PropTypes from "prop-types";

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

export const UserDataFormComponent = ({ userRaw, isHeader }) => {
  if (isHeader) {
    return (
      <div className="user-data-row">
        <div className="user-data-username user-data-header">Nombre</div>
        <div className="user-data-employment user-data-header">Empleo</div>
        <div className="user-data-civilStatus user-data-header">Estado Civil</div>
        <div className="user-data-age-data user-data-header">Edad</div>
        <div className="user-data-genre-data user-data-header">Género</div>
        <div className="user-data-score user-data-header">Estado</div>
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
    <div className="user-data-row">
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
