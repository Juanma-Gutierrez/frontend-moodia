/**
 * ModalModel class
 *
 * A model class that represents the structure of a modal with a title, message, and action buttons.
 * The class is used to create modal instances with customizable properties like button labels and modal type.
 */
export default class ModalModel {
  /**
   * Constructor
   *
   * Initializes a new instance of the ModalModel class with the provided modal data.
   * It sets the title, message, button1, button2 (optional), and type (defaulted to "info") for the modal.
   *
   * @param {Object} param0 - The properties for the modal.
   * @param {string} param0.title - The title of the modal.
   * @param {string} param0.message - The message to be displayed inside the modal.
   * @param {string} param0.button1 - The text for the first button.
   * @param {string} [param0.button2=null] - The text for the second button (optional).
   * @param {string} [param0.type="info"] - The type of the modal, which affects its styling (default is "info").
   */
  constructor({ title, message, button1, button2 = null, type = "info" }) {
    this.title = title;
    this.message = message;
    this.button1 = button1;
    this.button2 = button2;
    this.type = type;
  }
}
