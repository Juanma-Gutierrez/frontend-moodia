import PropTypes from "prop-types";
import "./ButtonComponent.scss";

export const ButtonComponent = ({ text, icon: Icon, onClick, disabled }) => {
  const iconColor = getComputedStyle(document.documentElement).getPropertyValue("--icon-color");

  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {Icon && (
        <Icon className="svg" stroke={iconColor}>
          Icono
        </Icon>
      )}
      <span className="text">{text}</span>
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
