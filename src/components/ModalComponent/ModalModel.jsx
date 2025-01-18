class ModalModel {
  /**
   * Crea una nueva instancia del modelo para el modal.
   * @param {string} title - El título del modal.
   * @param {string} message - El mensaje del modal.
   * @param {string} button1 - Texto del primer botón (ej. "Aceptar").
   * @param {string} button2 - Texto del segundo botón (ej. "Cancelar").
   */
  constructor(title, message, button1, button2) {
    this.title = title;
    this.message = message;
    this.button1 = button1;
    this.button2 = button2;
  }
}

export default ModalModel;
