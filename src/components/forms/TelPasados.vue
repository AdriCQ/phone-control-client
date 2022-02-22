<template>
  <q-card>
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <q-input v-model="year" type="number" min="2019" max="2050" label="Año" />
        <q-select v-model="mes" :options="DateHelper().months" label="Mes" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          :icon="report ? 'mdi-cloud-download' : 'mdi-magnify'"
          :label="report ? 'Descargar Reporte' : 'Buscar'"
          type="submit"
          class="full-width"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang='ts'>
import { responseHandler, DateHelper } from 'src/helpers';
import { IMes, injectStrict, statsModulenKey } from 'src/modules';
import { defineComponent, ref, toRefs } from 'vue';

/**
 * TelPasadosForm
 */
export default defineComponent({
  name: 'TelPasadosForm',
  emits: ['ok'],
  props: {
    report: {
      type: Boolean,
      default: false
    }
  },
  setup(_props, $ctx) {
    const $statsModule = injectStrict(statsModulenKey);

    const { report } = toRefs(_props);

    const mes = ref<IMes>(DateHelper().monthName(new Date().getMonth()));
    const year = ref(new Date().getFullYear());
    /**
     * onSubmit
     */
    async function onSubmit() {
      responseHandler.loading();
      try {
        if (report.value) {
          await $statsModule.telsPasados({
            mes: DateHelper().monthIndex(mes.value),
            year: year.value
          }, true);
        }
        else {
          $ctx.emit('ok', await $statsModule.telsPasados({
            mes: DateHelper().monthIndex(mes.value),
            year: year.value
          }));
        }
      } catch (error) {
        responseHandler.axiosError(error)
      }
      responseHandler.loading(false);
    }

    return {
      mes, year, onSubmit, DateHelper
    }
  }
});
</script>