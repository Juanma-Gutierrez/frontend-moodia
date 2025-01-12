import PropTypes from "prop-types";
import "./NavigationButtonComponent.scss";

export const NavigationButtonComponent = ({ title, icon: Icon, logo }) => {
  const iconColor = logo
    ? getComputedStyle(document.documentElement).getPropertyValue("--logo-color")
    : getComputedStyle(document.documentElement).getPropertyValue("--icon-color");

  return (
    <button className="navigation-button" onClick={() => console.log({ title })} disabled={logo}>
      {Icon && <Icon className="button-icon" stroke={iconColor} />}
      <span className="button-text">{title}</span>
    </button>
  );
};

NavigationButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  logo: PropTypes.bool,
};
