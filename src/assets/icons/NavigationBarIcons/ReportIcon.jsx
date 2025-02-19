import PropTypes from "prop-types";

/**
 * ReportIcon Component
 * @param {Object} props - The component props.
 * @param {string} props.stroke - The stroke color of the SVG icon.
 * @returns {JSX.Element} - Returns an SVG element representing an admin icon.
 */
export const ReportIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <title>{"report"}</title>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 21v-4m6 4v-8m6 8v-6m6 6V11M8.44 5.56a1.495 1.495 0 0 0 2.121 0m-2.122 0a1.5 1.5 0 1 1 2.121 0m-2.12 0L5.56 8.44m0 0A1.5 1.5 0 1 0 3.44 10.56a1.5 1.5 0 0 0 2.122-2.122Zm5-2.88 2.88 2.88m0 0a1.5 1.5 0 1 0 2.121 0m-2.122 0a1.496 1.496 0 0 1 2.121 0m0 0 2.88-2.88m0 0A1.5 1.5 0 1 0 20.56 3.44a1.5 1.5 0 0 0-2.122 2.122Z"
    />
    </g>
  </svg>
);

ReportIcon.propTypes = {
  stroke: PropTypes.string,
};
