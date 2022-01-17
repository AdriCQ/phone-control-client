import { InjectionKey, ref } from 'vue';
import { IDepartamento, ICargo, ILugar, IEntidad } from './types';
import { $api } from 'src/boot/axios';
import { IApiResp } from 'src/types';
/**
 * Entidad Module class
 */
class EntidadModule {
  /**
   * -----------------------------------------
   *	Data
   * -----------------------------------------
   */
  private _lugares = ref<ILugar[]>([]);
  private _entidades = ref<IEntidad[]>([]);
  /**
   * cargos Setter & Getter
   */
  get cargos() {
    const cargos: ICargo[] = [];
    this.departamentos.forEach(_dep => {
      if (_dep.cargos)
        cargos.push(..._dep.cargos);
    });
    return cargos;
  }
  /**
   * Lugares Setter & Getter
   */
  get lugares() { return this._lugares.value }
  set lugares(_p: ILugar[]) { this._lugares.value = _p }
  /**
   * organos Setter & Getter
   */
  get entidades() { return this._entidades.value }
  set entidades(_p: IEntidad[]) { this._entidades.value = _p }
  /**
   * organos Setter & Getter
   */
  get departamentos() {
    const data: IDepartamento[] = [];
    this.entidades.forEach(_ent => {
      if (_ent.departamentos) {
        data.push(..._ent.departamentos)
      }
    })
    return data;
  }
  /**
   * -----------------------------------------
   *	Services
   * -----------------------------------------
   */
  /**
   * loadLugares
   * @returns Promise<ILugar[]>
   */
  async loadLugares(): Promise<ILugar[]> {
    try {
      const resp = await $api.get<IApiResp<ILugar[]>>('/api/gestel/lugares');
      this.lugares = resp.data.data;
      return this.lugares;
    } catch (error) { throw error; }
  }
  /**
   * loadEntidades
   * @returns 
   */
  async loadEntidades(_deep = false): Promise<IEntidad[]> {
    try {
      const resp = await $api.get<IApiResp<IEntidad[]>>('/api/gestel/entidades', { params: { deep: Number(_deep) } });
      this.entidades = resp.data.data;
      return this.entidades;
    } catch (error) { throw error; }
  }
}

export const entidadModule = new EntidadModule();
export const entidadModuleKey: InjectionKey<EntidadModule> = Symbol('EntidadModule');
export * from './types';