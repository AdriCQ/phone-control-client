import { IDatabaseModel } from '../types';

export type IMes = 'ENERO' | 'FEBRERO' | 'MARZO' | 'ABRIL' | 'MAYO' | 'JUNIO' | 'JULIO' | 'AGOSTO' | 'SEPTIEMBRE' | 'OCTUBRE' | 'NOVIEMBRE' | 'DICIEMBRE';
/**
 * IFactura
 */
export interface IFactura extends IDatabaseModel {
  fecha: string;
  resumen?: unknown;
}
/**
 * IFacturaGetCsv
 */
export interface IFacturaGetCsv {
  total: number;
  tels: IFacturaTel[];
}
/**
 * IFacturaTel
 */
export interface IFacturaTel {
  TELF: string;
  IMPT: number;
  CARGO?: string;
}