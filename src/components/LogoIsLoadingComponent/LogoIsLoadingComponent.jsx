import "./LogoIsLoadingComponent.scss";
import PropTypes from "prop-types";
import { LogoIcon } from "@assets/icons/NavigationBarIcons/LogoIcon";

/**
 * LogoIsLoadingComponent
 *
 * A component that displays a loading overlay with a logo icon while content is loading.
 * The icon's stroke color is dynamically set from a CSS variable.
 *
 * @returns {JSX.Element} - Returns a loading overlay with the logo icon.
 */
export const LogoIsLoadingComponent = () => {
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");
  return (
    <div className="logo-isLoading-overlay">
      <div className="logo-isLoading">
        <LogoIcon stroke={stroke} />
      </div>
    </div>
  );
};

LogoIsLoadingComponent.propTypes = {
  children: PropTypes.node,
};
