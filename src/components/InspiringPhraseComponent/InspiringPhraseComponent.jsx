import "./InspiringPhraseComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";

export const InspiringPhraseComponent = ({ inspiringPhrase, onClick }) => {
  const { title, message } = inspiringPhrase;

  return (
    <div className="inspiring-phrase-card-component">
      <h3>{title} </h3>
      <p> {message} </p>
      <div className="inspiring-phrase-footer-container">
        <ButtonComponent text="Ocultar frase" type="info-accept" onClick={onClick}></ButtonComponent>
      </div>
    </div>
  );
};

InspiringPhraseComponent.propTypes = {
  idInspiringPhrase: PropTypes.string,
};
