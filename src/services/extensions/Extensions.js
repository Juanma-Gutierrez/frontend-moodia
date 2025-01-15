import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateTimeString, dateFormat) => {
  const date = new Date(dateTimeString);
  return format(date, dateFormat, { locale: es });
};