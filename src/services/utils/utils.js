import { format } from "date-fns";

/**
 * Returns the current date formatted according to the specified format.
 * If no format is provided, the default format is "yyyy/MM/dd".
 *
 * @param {string} [dateFormat="yyyy/MM/dd"] - The format in which the date should be returned.
 * @param {Date} [date=new Date()] - The date to format. Defaults to the current date if not provided.
 * @returns {string} - The formatted date as a string.
 */
export const getFormattedDate = (dateFormat = "yyyy/MM/dd", date = new Date()) => {
  return format(date, dateFormat);
};

/**
 * Calculates the age based on the provided birth date.
 * The age is calculated by subtracting the birth year from the current year,
 * and then adjusting for the month and day difference to account for incomplete birthdays.
 *
 * @param {string|Date} birthDate - The birth date in a string or Date object format.
 * @returns {number|null} - The calculated age in years, or null if the birth date is not provided or invalid.
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};