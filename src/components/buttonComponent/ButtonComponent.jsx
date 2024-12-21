import PropTypes from "prop-types";
import "./buttonComponent.scss";

export const ButtonComponent = ({ title, icon: Icon }) => {
  return (
    <button className="button" onClick={() => console.log({ title })}>
      {Icon && <Icon className="button-icon" stroke="#eee"/>}
      <span className="button-text">{title}</span>
    </button>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType
};
