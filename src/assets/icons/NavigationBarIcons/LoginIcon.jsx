import PropTypes from "prop-types";

/**
 * LoginIcon Component
 * @param {Object} props - The component props.
 * @param {string} props.stroke - The stroke color of the SVG icon.
 * @returns {JSX.Element} - Returns an SVG element representing an admin icon.
 */
export const LoginIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 21a7.001 7.001 0 0 1 6-6.93m9.873 1.134a3.432 3.432 0 0 1-.206.006c-1.025 0-1.96-.458-2.667-1.21-.708.752-1.642 1.21-2.667 1.21-.069 0-.137-.002-.206-.006A5.606 5.606 0 0 0 14 16.398c0 2.214 1.275 4.075 3 4.602 1.725-.527 3-2.388 3-4.602 0-.412-.044-.813-.127-1.194ZM15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </g>
  </svg>
);

LoginIcon.propTypes = {
  stroke: PropTypes.string,
};
