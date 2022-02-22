import { InjectionKey } from 'vue';
import { IMesYear } from 'src/modules';
import { $api } from 'src/boot/axios';
import { IStatsTelPasado } from './types';
import { IApiResp } from 'src/types';
import { openURL as qOpenUrl } from 'quasar';
/**
 * StatsModule
 */
export class StatsModule {
  /**
   * telsPasados
   * @param params IMesYear
   * @returns Promise<IStatsTelPasado[]>
   */
  async telsPasados(params: IMesYear, _report = false) {
    try {
      return _report
        ? qOpenUrl(`http://localhost:8000/gestel/reports/sobregiro?year=${params.year}&mes=${params.mes}&report=1`)
        : (await $api.get<IApiResp<IStatsTelPasado[]>>('/api/gestel/tels/pasados', { params })).data.data;
    } catch (error) { throw error }
  }
}

export const statsModule = new StatsModule();
export const statsModulenKey: InjectionKey<StatsModule> = Symbol('StatsModule');