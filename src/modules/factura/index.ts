import { $api, $csrf } from 'src/boot/axios';
import { IApiResp } from 'src/types';
import { InjectionKey } from 'vue';
import { IFactura, IFacturaGetCsv } from './types';

const MODULE_API = '/api/gestel/facturas';
/**
 * FacturaModule
 */
class FacturaModule {
  /**
   * find
   * @returns Promise<IFactura>
   */
  async find(_id: number): Promise<string[]> {
    try {
      const resp = await $api.get<IApiResp<string[]>>(MODULE_API + `/${_id}`);
      return resp.data.data;
    } catch (error) { throw error; }
  }
  /**
   * GetData
   * @returns Promise<IFactura>
   */
  async getData(_id: number): Promise<IFacturaGetCsv> {
    try {
      const resp = await $api.get<IApiResp<IFacturaGetCsv>>(MODULE_API + `/${_id}/get`);
      return resp.data.data;
    } catch (error) { throw error; }
  }
  /**
   * list
   * @returns Promise<IFactura[]>
   */
  async list(): Promise<IFactura[]> {
    try {
      const resp = await $api.get<IApiResp<IFactura[]>>(MODULE_API);
      return resp.data.data;
    } catch (error) { throw error; }
  }
  /**
   * uploadEtecsa
   * @param _data FormData
   * @returns 
   */
  async uploadEtecsa(_data: FormData): Promise<IFactura> {
    try {
      await $csrf();
      const resp = await $api.post<IApiResp<IFactura>>(MODULE_API + '/etecsa', _data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return resp.data.data;
    } catch (error) { throw error; }
  }
}

export const facturaModule = new FacturaModule();
export const facturaModuleKey: InjectionKey<FacturaModule> = Symbol('FacturaModule');

export * from './types';