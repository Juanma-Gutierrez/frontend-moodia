import PropTypes from "prop-types";
import "./buttonComponent.scss";

export const ButtonComponent = ({ title, icon: Icon, logo}) => {
  const iconColor = getComputedStyle(document.documentElement).getPropertyValue('--icon-color');

  return (
    <button className="button" onClick={() => console.log({ title })} disabled={logo}>
      {Icon && <Icon className="button-icon" stroke={iconColor}/>}
      <span className="button-text">{title}</span>
    </button>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  logo: PropTypes.bool,
};
