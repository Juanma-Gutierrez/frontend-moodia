import "./UserDataFormComponent.scss";
import PropTypes from "prop-types";

export const UserDataFormComponent = ({ userRaw }) => {
  const user = userRaw.user;
  const employment = userRaw.employment;
  const civilStatus = userRaw.civilStatus;

  return (
    <div className="">
      {user.name}
      {employment}
      {civilStatus}
    </div>
  );
};

UserDataFormComponent.propTypes = {
  user: PropTypes.object.isRequired,
};
