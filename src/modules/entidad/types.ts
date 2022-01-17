import { IDatabaseModel } from '../types';
/**
 * IEntidadType
 */
export type IEntidadType = 'MININT' | 'EMPRESA';
/**
 * IEntidad
 */
export interface IEntidad extends IDatabaseModel {
  nombre: string;
  tipo: IEntidadType;
  departamentos?: IDepartamento[];
}
/**
 * ILugar
 */
export interface ILugar {
  id: number;
  nombre: string;
}
/**
 * IDepartamento
 */
export interface IDepartamento extends IDatabaseModel {
  nombre: string;
  entidad_id: number;
  entidad?: IEntidad;
  cargos?: ICargo[];
  lugar_id: number;
  lugar?: ILugar;
}
/**
 * ICargo
 */
export interface ICargo extends IDatabaseModel {
  nombre: string;
  dep_id: number;
  departamento?: IDepartamento;
}

/**
 * -----------------------------------------
 *	Requests
 * -----------------------------------------
 */
/**
 * ICreateEntidad
 */
export interface ICreateEntidad {
  nombre: string;
}