import "./ModalAssignPhraseComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { useState } from "react";

/**
 * ModalAssignPhraseComponent
 *
 * A modal component that allows users to assign an inspiring phrase from a list of available phrases.
 * It includes a dropdown to select a phrase and buttons to confirm or cancel the selection.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.inspiringPhrases - List of available inspiring phrases to choose from.
 * @param {Function} props.onConfirm - Callback function triggered when a phrase is selected and assigned.
 * @param {Function} props.onCancel - Callback function triggered when the action is canceled.
 * @returns {JSX.Element} - Returns a modal with a phrase selection dropdown and action buttons.
 */
export const ModalAssignPhraseComponent = ({ inspiringPhrases, onConfirm, onCancel }) => {
  const [phraseValue, setPhraseValue] = useState("");

  /**
   * handleOnAccept
   *
   * A function that triggers the onConfirm callback with the selected phrase value.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleOnAccept = () => {
    onConfirm(phraseValue);
  };

  /**
   * handleOnCancel
   *
   * A function that triggers the onCancel callback to cancel the phrase assignment action.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleOnCancel = () => {
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
            size="8"
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
          <ButtonComponent text="Asignar" type="confirm-accept" onClick={handleOnAccept} />
          <ButtonComponent text="Cancelar" type="confirm-cancel" onClick={handleOnCancel} />
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
