import { IMes } from 'src/modules';

export function DateHelper() {
  const months: IMes[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  /**
   * monthName
   * @returns 
   */
  function monthName(_month?: number): IMes {
    return _month && _month >= 0 && _month < 12 ? months[_month] : months[new Date().getMonth()]
  }

  return {
    months, monthName
  }
}