import PropTypes from "prop-types";

/**
 * LogoutIcon Component
 * @param {Object} props - The component props.
 * @param {string} props.stroke - The stroke color of the SVG icon.
 * @returns {JSX.Element} - Returns an SVG element representing an admin icon.
 */
export const LogoutIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m11 16 4-4m0 0-4-4m4 4H3m8-9h6.8c1.12 0 1.68 0 2.108.217a2 2 0 0 1 .874.875C21 4.519 21 5.079 21 6.2v11.6c0 1.12 0 1.68-.218 2.107a2 2 0 0 1-.874.875C19.48 21 18.92 21 17.8 21H11"
      />
    </g>
  </svg>
);

LogoutIcon.propTypes = {
  stroke: PropTypes.string,
};
