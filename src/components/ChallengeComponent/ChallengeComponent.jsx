import "./ChallengeComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";

/**
 * ChallengeComponent Component
 * @param {Object} props - The component props.
 * @param {Object} props.challenge - The challenge object containing `title` and `message`.
 * @param {Function} props.onAccept - The function to execute when the "Accept Challenge" button is clicked.
 * @param {Function} props.onChangeChallenge - The function to execute when the "Change Challenge" button is clicked.
 * @returns {JSX.Element} - Returns a component displaying a challenge with formatted message and action buttons.
 */
export const ChallengeComponent = ({ challenge, onAccept, onChangeChallenge }) => {
  const { title, message } = challenge;

  /**
   * Handles the "Accept Challenge" button click.
   * Calls the `onAccept` function passed via props.
   */
  const handleAcceptChallenge = () => {
    onAccept();
  };

  /**
   * Handles the "Change Challenge" button click.
   * Calls the `onChangeChallenge` function passed via props.
   */
  const handleChangeChallenge = () => {
    onChangeChallenge();
  };

  /**
   * Formats the challenge message by replacing placeholders with HTML elements.
   * @param {string} message - The raw message string containing placeholders like `<breakLine>` and `<bulletPoint>`.
   * @returns {string} - Returns the formatted message as an HTML string.
   */
  const formatMessage = (message) => {
    let formattedMessage = message.replace(/<breakLine>/g, "<br />");
    formattedMessage = formattedMessage
      .split("<bulletPoint>")
      .map((item, index) => {
        if (index === 0) {
          return item;
        }
        return `<li>${item}</li>`;
      })
      .join("");
    formattedMessage = `<ul>${formattedMessage}</ul>`;
    return formattedMessage;
  };

  return (
    <div className="challenge-component-container">
      <h1 className="challenge-component-title">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: formatMessage(message) }} />
      <div className="challenge-component-buttons">
        <ButtonComponent type="confirm-accept" text="Aceptar reto" onClick={handleAcceptChallenge} width="full" />
        <ButtonComponent type="confirm-cancel" text="Cambiar reto" onClick={handleChangeChallenge} width="full" />
      </div>
    </div>
  );
};

ChallengeComponent.propTypes = {
  challenge: PropTypes.object.isRequired,
};
