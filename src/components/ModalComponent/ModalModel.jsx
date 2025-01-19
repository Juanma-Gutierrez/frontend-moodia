export default class ModalModel {
  /**
   * Crea una nueva instancia del modelo para el modal.
   * @param {Object} options - Opciones para configurar el modal.
   * @param {string} options.title - El título del modal.
   * @param {string} options.message - El mensaje del modal.
   * @param {string} [options.button1] - Texto del primer botón (ej. "Aceptar").
   * @param {string} [options.button2] - Texto del segundo botón (ej. "Cancelar").
   * @param {string} [options.type="info"] - Tipo del modal (ej. "info", "query", "warning").
   */
  constructor({ title, message, button1, button2 = null, type = "info" }) {
    this.title = title;
    this.message = message;
    this.button1 = button1;
    this.button2 = button2;
    this.type = type;
  }
}
