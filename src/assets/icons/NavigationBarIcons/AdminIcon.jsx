import PropTypes from "prop-types";

/**
 * AdminIcon Component
 * @param {Object} props - The component props.
 * @param {string} props.stroke - The stroke color of the SVG icon.
 * @returns {JSX.Element} - Returns an SVG element representing an admin icon.
 */
export const AdminIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12.905 3.06C12.699 3 12.465 3 12 3c-.466 0-.699 0-.905.06a1.5 1.5 0 0 0-.76.515c-.133.169-.22.385-.392.818a1.265 1.265 0 0 1-1.574.73l-.571-.19c-.405-.135-.608-.203-.806-.214a1.5 1.5 0 0 0-.835.197c-.172.099-.323.25-.625.552-.32.32-.481.48-.583.664a1.5 1.5 0 0 0-.181.884c.021.208.105.418.274.84.264.66.01 1.413-.6 1.778l-.277.167c-.425.255-.637.382-.791.558a1.5 1.5 0 0 0-.303.534C3 11.116 3 11.366 3 11.866c0 .593 0 .89.095 1.143a1.5 1.5 0 0 0 .396.586c.2.182.473.29 1.018.508.556.223.843.841.653 1.41l-.215.645c-.149.447-.223.671-.23.89a1.5 1.5 0 0 0 .179.759c.104.193.27.36.604.693.333.333.5.5.693.604a1.5 1.5 0 0 0 .758.18c.22-.008.444-.082.89-.231l.528-.176a1.265 1.265 0 0 1 1.574.73c.173.433.26.65.392.818a1.5 1.5 0 0 0 .76.515c.206.06.44.06.905.06.466 0 .699 0 .905-.06a1.5 1.5 0 0 0 .76-.515c.133-.169.22-.385.392-.818a1.265 1.265 0 0 1 1.574-.73l.527.176c.447.149.67.223.89.23a1.5 1.5 0 0 0 .758-.179c.194-.104.36-.27.694-.604.333-.333.5-.5.604-.693a1.5 1.5 0 0 0 .179-.758c-.007-.22-.082-.444-.23-.89l-.216-.646a1.133 1.133 0 0 1 .654-1.41c.545-.217.817-.326 1.018-.508a1.5 1.5 0 0 0 .396-.586c.095-.254.095-.55.095-1.143 0-.5 0-.75-.071-.973a1.5 1.5 0 0 0-.302-.534c-.155-.176-.367-.303-.792-.558l-.278-.167a1.447 1.447 0 0 1-.6-1.778c.17-.422.253-.632.275-.84a1.5 1.5 0 0 0-.181-.884c-.102-.183-.263-.344-.583-.664-.302-.302-.453-.453-.625-.552a1.5 1.5 0 0 0-.835-.197c-.199.011-.401.079-.806.214l-.57.19a1.265 1.265 0 0 1-1.575-.73c-.173-.433-.26-.65-.392-.818a1.5 1.5 0 0 0-.76-.515Z"
      />
    </g>
  </svg>
);

AdminIcon.propTypes = {
  stroke: PropTypes.string,
};
