import PropTypes from "prop-types";

/**
 * EditIcon Component
 * @param {Object} props - The component props.
 * @param {string} [props.stroke="#fff"] - The stroke color of the SVG icon. Defaults to white (#fff) if not provided.
 * @returns {JSX.Element} - Returns an SVG element representing an edit icon.
 */
export const EditIcon = ({ stroke = "#fff" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        width={24}
        height={24}
        d="m15.5 5.5 2.828 2.828M3 21l.047-.332c.168-1.176.252-1.764.443-2.312.17-.487.401-.95.69-1.378.323-.482.743-.902 1.583-1.741L17.41 3.589a2 2 0 0 1 2.828 2.828L8.377 18.28c-.761.762-1.142 1.143-1.576 1.445-.385.27-.8.492-1.237.664-.492.194-1.02.3-2.076.513L3 21Z"
      />
    </g>
  </svg>
);

EditIcon.propTypes = {
  stroke: PropTypes.string,
};
