<template>
  <q-card class="no-box-shadow">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section class="q-gutter-y-sm">
        <q-select v-model="mes" :options="meses" label="Mes" />
        <q-file v-model="factura" accept=".zip" label="Facturas .ZIP">
          <template v-slot:prepend>
            <q-icon name="mdi-paperclip" />
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="mdi-check" label="OK" type="submit" />
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
  setup() {
    const $facturaModule = injectStrict(facturaModuleKey);

    onBeforeMount(() => {
      mes.value = DateHelper().monthName();
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const mes = ref<IMes>('ENERO');
    const meses = DateHelper().months;
    const factura = ref();
    /**
     * onSubmit
     */
    async function onSubmit() {
      const formData = new FormData();
      formData.append('fecha', `${new Date().getFullYear()}-${mes.value}`);
      formData.append('factura', factura.value);
      try {
        const resp = await $facturaModule.uploadZip(formData);
        console.log(resp);
      } catch (error) {
        responseHandler.axiosError(error);
      }
    }

    return {
      factura, mes, meses,
      onSubmit
    }
  }
});
</script>