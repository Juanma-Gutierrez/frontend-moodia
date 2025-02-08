import "./LogoIsLoadingComponent.scss";
import PropTypes from "prop-types";

import { LogoIcon } from "@assets/Icons/NavigationBarIcons/LogoIcon";

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
