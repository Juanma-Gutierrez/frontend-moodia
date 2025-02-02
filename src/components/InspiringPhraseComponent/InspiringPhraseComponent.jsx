import "./InspiringPhraseComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { CONSTANTS } from "../../constants/Constants";

export const InspiringPhraseComponent = ({ inspiringPhrase, onClick }) => {
  const { title, message, idCategory } = inspiringPhrase;

  const cardStyle = {
    backgroundImage: `url(${CONSTANTS.INSPIRING_PHRASE.BACKGROUND[idCategory]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "lighten",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    width: "100%",
    height: "100%",
  };

  return (
    <div className="inspiring-phrase-card-component" style={cardStyle}>
      <h3>{title} </h3>
      <p> {message} </p>
      <div className="inspiring-phrase-footer-container">
        <ButtonComponent text="Cerrar" type="info-accept" onClick={onClick}></ButtonComponent>
      </div>
    </div>
  );
};

InspiringPhraseComponent.propTypes = {
  idInspiringPhrase: PropTypes.string,
};
