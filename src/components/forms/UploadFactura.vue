<template>
  <q-card class="no-box-shadow">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="year" type="number" min="2000" max="3000" label="Año" />
        <q-select v-model="mes" :options="meses" label="Mes" />
        <q-file v-model="factura" accept=".zip" label="Facturas .ZIP">
          <template v-slot:prepend>
            <q-icon name="mdi-paperclip" />
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" class="full-width" icon="mdi-check" label="OK" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { DateHelper, responseHandler } from 'src/helpers';
import { facturaModuleKey, IMes, injectStrict } from 'src/modules';
import { defineComponent, ref, onBeforeMount } from 'vue'

/**
 * UploadFacturaForm
 */
export default defineComponent({
  name: 'UploadFacturaForm',
  emits: ['uploaded'],
  setup(_props, $ctx) {
    const $facturaModule = injectStrict(facturaModuleKey);

    onBeforeMount(() => {
      mes.value = DateHelper().monthName();
      year.value = new Date().getFullYear();
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const mes = ref<IMes>('ENERO');
    const meses = DateHelper().months;
    const factura = ref();
    const year = ref(new Date().getFullYear());
    /**
     * onSubmit
     */
    async function onSubmit() {
      const formData = new FormData();
      formData.append('mes', `${meses.findIndex(_m => _m === mes.value)}`);
      formData.append('year', `${year.value}`);
      formData.append('factura', factura.value);
      responseHandler.loading();
      try {
        const resp = await $facturaModule.uploadEtecsa(formData);
        console.log(resp);
        $ctx.emit('uploaded', resp);
      } catch (error) {
        responseHandler.axiosError(error);
      }
      responseHandler.loading(false);

    }

    return {
      factura, mes, meses, year,
      onSubmit
    }
  }
});
</script>