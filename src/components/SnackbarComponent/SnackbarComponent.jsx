import "./SnackbarComponent.scss";
import PropTypes from "prop-types";
import { SnackbarCrossIcon } from "@assets/Icons/SnackbarIcons/SnackbarCrossIcon";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants/Constants";

export const SnackbarComponent = ({ message, type, onClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClick();
    }, CONSTANTS.SNACKBAR.DURATION);
    return () => clearTimeout(timer);
  }, [onClick]);

  if (!isVisible) return null;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={`snackbar-component ${type}`}>
      <div className="snackbar-message">{message}</div>
      <div className="snackbar-cross" onClick={handleClick}>
        <SnackbarCrossIcon stroke={stroke} />
      </div>
    </div>
  );
};

SnackbarComponent.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "warning", "error"]),
};
