import PropTypes from "prop-types";

/**
 * SnackbarCrossIcon Component
 * @param {Object} props - The component props.
 * @param {string} props.stroke - The stroke color of the SVG icon.
 * @returns {JSX.Element} - Returns an SVG element representing an admin icon.
 */
export const SnackbarCrossIcon = ({ stroke }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M18 6L6 18" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

SnackbarCrossIcon.propTypes = {
  stroke: PropTypes.string,
};
