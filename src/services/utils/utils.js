import { format } from "date-fns";

/**
 * Devuelve la fecha actual en formato pasado por parámetro, por defecto será "yyyy/MM/dd".
 * @param format {string} formato de la fecha a devolver.
 * @returns {string} Fecha formateada.
 */
export const getFormattedDate = (dateFormat = "yyyy/MM/dd") => {
  return format(new Date(), dateFormat);
};
