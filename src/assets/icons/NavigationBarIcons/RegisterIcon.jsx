import PropTypes from "prop-types";
// OK
export const RegisterIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 18h-6m3-3v6M4 21a7 7 0 0 1 9-6.71M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </g>
  </svg>
);

RegisterIcon.propTypes = {
  stroke: PropTypes.string,
};
