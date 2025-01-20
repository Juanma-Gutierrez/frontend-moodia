import PropTypes from "prop-types";

export const ChallengeIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 12 2 2 4-4m-3-7 1.91 1.871 2.59-.665.718 2.576 2.576.718-.666 2.59L21 12l-1.872 1.91.666 2.59-2.576.718-.718 2.576-2.59-.666L12 21l-1.91-1.872-2.59.666-.718-2.576-2.576-.718.665-2.59L3 12l1.871-1.91-.665-2.59 2.576-.718.718-2.576 2.59.665L12 3Z"
      />
    </g>
  </svg>
);

ChallengeIcon.propTypes = {
  stroke: PropTypes.string,
};
