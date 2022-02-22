import { InjectionKey, ref } from 'vue';
import { $api, $csrf } from 'src/boot/axios';
import { ITel, ITelSearch } from './types';
import { IApiResp } from 'src/types';
/**
 * MODULE_API
 */
const MODULE_API = '/api/gestel/tels';

/**
 * TelModule Class
 */
export class TelModule {
  /**
   * -----------------------------------------
   *	Data
   * -----------------------------------------
   */
  private _tel = ref<ITel>({
    cargo_id: 0,
    fecha_alta: new Date(),
    id: 0,
    presupuesto: 0,
    servicio: 'AUTOMATICO',
    telf: '',
    tipo: 'PRIVADO',
    config: { comprado: false, entregado: false }
  });
  private _tels = ref<ITel[]>([]);
  /**
   * Tel getter & setter
   */
  get tel() { return this._tel.value }
  set tel(_tel: ITel) { this._tel.value = _tel }
  /**
   * Tels getter & setter
   */
  get tels() { return this._tels.value }
  set tels(_tel: ITel[]) { this._tels.value = _tel }

  /**
   * -----------------------------------------
   *	Services
   * -----------------------------------------
   */
  /**
   * create
   * @param _tel 
   * @returns 
   */
  async create(_tel: ITel): Promise<ITel> {
    try {
      await $csrf();
      const resp = await $api.post<IApiResp<ITel>>(MODULE_API + '/', _tel);
      return resp.data.data;
    } catch (error) { throw error; }

  }
  /**
   * getTels
   * @returns 
   */
  async loadTels(): Promise<ITel[]> {
    await $api.get('');
    return this.tels;
  }
  /**
   * find
   * @param _id number
   * @returns Promise<ITel>
   */
  async find(_id: number): Promise<ITel> {
    try {
      const resp = await $api.get<IApiResp<ITel>>(MODULE_API + `/${_id}`);
      this.tel = resp.data.data;
      return this.tel;
    } catch (error) { throw error; }
  }
  /**
   * searchTels
   * @param _search string
   * @returns Promise<ITel[]>
   */
  async searchTels(_search: ITelSearch): Promise<ITel[]> {
    try {
      const resp = await $api.get<IApiResp<ITel[]>>(MODULE_API + '/search', { params: _search });
      this.tels = resp.data.data;
      return this.tels;
    } catch (error) { throw error; }
  }
  /**
   * update
   * @param _id number
   * @param _tel ITel
   * @returns Promise<ITel>
   */
  async update(_id: number, _tel: ITel): Promise<ITel> {
    try {
      await $csrf();
      const resp = await $api.put<IApiResp<ITel>>(MODULE_API + `/${_id}`, _tel);
      console.log(resp);
      this.tel = resp.data.data;
      return this.tel;
    } catch (error) { throw error; }
  }
}

export const telModule = new TelModule();
export const telModuleKey: InjectionKey<TelModule> = Symbol('TelModule');
export * from './types';
