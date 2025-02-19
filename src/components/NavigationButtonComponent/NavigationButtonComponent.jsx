import "./NavigationButtonComponent.scss";
import PropTypes from "prop-types";

/**
 * NavigationButtonComponent
 *
 * A button component used in navigation that can optionally display an icon or a logo.
 *
 * @param {string} title - The title of the button to be displayed.
 * @param {React.Component} icon - The icon component to render inside the button (optional).
 * @param {boolean} logo - A flag to determine if the button is a logo (optional).
 * @returns {JSX.Element} The JSX structure for the button component.
 */
export const NavigationButtonComponent = ({ title, icon: Icon, logo }) => {
  /**
   * iconColor
   *
   * Determines the color of the icon based on whether it's a logo or a regular icon.
   * It gets the appropriate color from the CSS variables.
   *
   * @type {string} - The color value to apply to the icon or logo.
   */
  const iconColor = logo
    ? getComputedStyle(document.documentElement).getPropertyValue("--logo-color")
    : getComputedStyle(document.documentElement).getPropertyValue("--icon-color");

  return (
    <button className={`navigation-button ${logo ? "logo" : ""}`}>
      {Icon && <Icon className="button-icon" stroke={iconColor} />}
      <span className="button-text">{title}</span>
    </button>
  );
};

NavigationButtonComponent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.elementType,
  logo: PropTypes.bool,
};
