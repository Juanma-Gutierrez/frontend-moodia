import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formats a date string into a specific format based on the provided date format.
 *
 * This function uses the `date-fns` library to format a given date string according to
 * the specified format. The locale is set to Spanish (`es`).
 *
 * @param {string} dateTimeString - The date string to be formatted.
 * @param {string} dateFormat - The format in which the date should be displayed (e.g., "yyyy-MM-dd").
 *
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateTimeString, dateFormat) => {
  const date = new Date(dateTimeString);
  return format(date, dateFormat, { locale: es });
};