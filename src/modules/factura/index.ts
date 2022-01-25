import { $api, $csrf } from 'src/boot/axios';
import { InjectionKey } from 'vue';

class FacturaModule {

  async uploadZip(_data: FormData) {
    try {
      await $csrf();
      const resp = await $api.post('/api/gestel/facturas', _data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return resp
    } catch (error) { throw error; }
  }
}

export const facturaModule = new FacturaModule();
export const facturaModuleKey: InjectionKey<FacturaModule> = Symbol('FacturaModule');

export * from './types';