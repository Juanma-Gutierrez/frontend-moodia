/**
 * SnackbarComponentTypes
 *
 * This object defines the possible types of snackbar notifications. These types are used to style and
 * categorize the snackbar notifications accordingly.
 *
 * @property {string} INFO - Represents an informational snackbar type.
 * @property {string} WARNING - Represents a warning snackbar type.
 * @property {string} ERROR - Represents an error snackbar type.
 *
 * @example
 * // Usage example:
 * <SnackbarComponent message="This is an info message" type={SnackbarComponentTypes.INFO} onClick={handleClick} />
 */
export const SnackbarComponentTypes = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
