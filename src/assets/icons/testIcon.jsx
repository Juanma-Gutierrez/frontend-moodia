import PropTypes from "prop-types";

export const TestIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 50.8 50.8">
    <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.175}>
      <path d="M44.979 25.929V5.821H5.821v39.158h20.108" />
      <circle cx={38.232} cy={38.232} r={6.747} />
      <path d="M33.073 33.073 21.431 21.431" />
      <circle cx={20.637} cy={20.637} r={1.587} />
    </g>
  </svg>
);

TestIcon.propTypes = {
  stroke: PropTypes.string, // Prop para el color del trazo
};