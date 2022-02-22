import { ICargo } from './../entidad/types';
import { IDatabaseModel } from '../types';
/**
 * ITelServicio
 */
export type ITelServicio = 'AUTOMATICO' | 'EXTENSION';
/**
 * ITelTipo
 */
export type ITelTipo = 'PUBLICO' | 'PRIVADO';
/**
 * ITel
 */
export interface ITel extends IDatabaseModel {
  telf: string;
  servicio: ITelServicio;
  fecha_alta: Date;
  presupuesto: number;
  tipo: ITelTipo;
  cargo_id: number;
  cargo?: ICargo;
  config: {
    comprado: boolean;
    entregado: boolean;
  };
  comentario?: string;
}

export interface ITelSearch {
  search: string;
  type: 'global' | 'tel' | 'cargo' | 'departamento' | 'entidad' | 'lugar';
}