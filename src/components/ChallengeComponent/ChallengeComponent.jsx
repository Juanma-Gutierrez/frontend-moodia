import "./ChallengeComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";

export const ChallengeComponent = ({ challenge, onAccept, onChangeChallenge }) => {
  const { title, message } = challenge;

  const handleAcceptChallenge = () => {
    onAccept();
  };

  const handleChangeChallenge = () => {
    onChangeChallenge();
  };

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
        <ButtonComponent type="confirm-accept" text="Aceptar reto" onClick={handleAcceptChallenge} />
        <ButtonComponent type="confirm-cancel" text="Cambiar reto" onClick={handleChangeChallenge} />
      </div>
    </div>
  );
};

ChallengeComponent.propTypes = {
  challenge: PropTypes.object.isRequired,
};
