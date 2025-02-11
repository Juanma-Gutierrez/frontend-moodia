import { format } from "date-fns";

/**
 * Devuelve la fecha actual en formato pasado por parámetro, por defecto será "yyyy/MM/dd".
 * @param format {string} formato de la fecha a devolver.
 * @returns {string} Fecha formateada.
 */
export const getFormattedDate = (dateFormat = "yyyy/MM/dd", date = new Date()) => {
  return format(date, dateFormat);
};

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