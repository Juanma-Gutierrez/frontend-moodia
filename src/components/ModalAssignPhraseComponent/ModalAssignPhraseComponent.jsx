import "./ModalAssignPhraseComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { useState } from "react";

export const ModalAssignPhraseComponent = ({ inspiringPhrases, onConfirm, onCancel }) => {
  const [phraseValue, setPhraseValue] = useState("");

  const handleButton1 = () => {
    onConfirm(phraseValue);
  };

  const handleButton2 = () => {
    onCancel();
  };

  return (
    <div className="modal-assign-phrase-overlay">
      <div className="modal-assign-phrase-container">
        <h1 className="modal-assign-phrase-title">Asignación de frase inspiradora</h1>
        <div className="modal-assign-phrase-phrase">
          <select
            className="modal-assign-phrase-select"
            id="phrase"
            value={phraseValue}
            onChange={(e) => {
              setPhraseValue(e.target.value);
            }}
          >
            <option value="">Selecciona una frase</option>
            {Array.isArray(inspiringPhrases) &&
              inspiringPhrases.map((phrase) => (
                <option key={phrase.idInspiringPhrase} value={phrase.idInspiringPhrase}>
                  {phrase.title} - {phrase.message}
                </option>
              ))}
          </select>
        </div>
        <div className="modal-assign-phrase-buttons">
          <ButtonComponent text="Asignar" type="confirm-accept" onClick={handleButton1} />
          <ButtonComponent text="Cancelar" type="confirm-cancel" onClick={handleButton2} />
        </div>
      </div>
    </div>
  );
};

ModalAssignPhraseComponent.propTypes = {
  inspiringPhrases: PropTypes.array.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
