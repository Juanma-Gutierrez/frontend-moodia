import "./SnackbarComponent.scss";
import PropTypes from "prop-types";
import { CONSTANTS } from "@constants/Constants";
import { SnackbarCrossIcon } from "@assets/icons/SnackbarIcons/SnackbarCrossIcon";
import { useState, useEffect } from "react";

/**
 * SnackbarComponent
 *
 * This component displays a snackbar notification with a message. It can be of different types: "info",
 * "warning", or "error". The snackbar disappears after a set duration or when the user clicks the close icon.
 * It triggers the `onClick` function when dismissed.
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {string} type - The type of snackbar. Can be "info", "warning", or "error".
 * @param {function} onClick - A callback function that is called when the snackbar is dismissed (either automatically
 * after the duration or manually by the user clicking the close icon).
 *
 * @returns {JSX.Element|null} - Returns the snackbar JSX element if `isVisible` is `true`, otherwise `null`.
 */
export const SnackbarComponent = ({ message, type, onClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");

  /**
   * useEffect
   *
   * This `useEffect` hook is used to trigger the snackbar's visibility. It sets the snackbar to disappear after
   * the specified duration, and then calls the `onClick` callback to notify that the snackbar has disappeared.
   *
   * @returns {void} - This hook does not return any value.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClick();
    }, CONSTANTS.SNACKBAR.DURATION);
    return () => clearTimeout(timer);
  }, [onClick]);

  if (!isVisible) return null;

  /**
   * handleClick
   *
   * This function is called when the user clicks on the cross icon of the snackbar. It triggers the `onClick` callback.
   *
   * @returns {void} - This function does not return any value.
   */
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
