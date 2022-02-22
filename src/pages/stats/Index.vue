<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Analisis</div>
      </q-card-section>
      <q-card-section class="q-gutter-x-sm">
        <q-btn color="primary" icon="mdi-magnify" label="Sobregiro" @click="searchDialog = true" />
        <q-btn
          color="primary"
          icon="mdi-cloud-download"
          label="Descargar Reporte"
          @click="reportDialog = true"
        />
      </q-card-section>

      <!-- Tels List -->
      <q-card-section v-if="telsPasados.length">
        <div class="row q-col-gutter-sm">
          <div
            class="col-sm-4 col-md-4 col-lg-2"
            v-for="(tel, telKey) in telsPasados"
            :key="`tel-${telKey}-${tel.id}`"
          >
            <tel-pasado :telf="tel" @dblclick="onDbClick(tel)" />
          </div>
        </div>
      </q-card-section>
      <!-- / Tel Details -->
    </q-card>
  </q-page>
  <!-- Tel Details -->
  <q-dialog v-model="popup">
    <tel-card :tel="telDetails" :edit-enable="false" :sobregiro="sobregiro" v-if="telDetails" />
    <q-card v-else>
      <q-card-section>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- / Tel Details -->

  <!-- Search Dialog -->
  <q-dialog v-model="searchDialog">
    <tel-pasado-form style="min-width: 20rem;" @ok="onSearchOk" key="tel-pasado-form" />
  </q-dialog>
  <!-- / Search Dialog -->

  <!-- reportDialog Dialog -->
  <q-dialog v-model="reportDialog">
    <tel-pasado-form
      style="min-width: 20rem;"
      report
      @ok="() => { reportDialog = false }"
      key="tel-pasado-report"
    />
  </q-dialog>
  <!-- / reportDialog Dialog -->
</template>

<script lang='ts'>
import { responseHandler } from 'src/helpers';
import { injectStrict, ITel, telModuleKey } from 'src/modules';
import { IStatsTelPasado } from 'src/modules/stats/types';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

/**
 * StatsPage
 */
export default defineComponent({
  name: 'StatsPage',
  components: {
    'tel-pasado': defineAsyncComponent(() => import('src/components/cards/TelPasado.vue')),
    'tel-card': defineAsyncComponent(() => import('src/components/cards/TelCard.vue')),
    'tel-pasado-form': defineAsyncComponent(() => import('src/components/forms/TelPasados.vue'))
  },
  setup() {
    const $telfModule = injectStrict(telModuleKey);

    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */

    const popup = ref(false);
    const searchDialog = ref(false);
    const reportDialog = ref(false);
    const sobregiro = ref(0);
    const telDetails = ref<ITel | null>(null);
    const telsPasados = ref<IStatsTelPasado[]>([]);
    /**
     * onDbClick
     * @param _tel IStatsTelPasado
     */
    async function onDbClick(_tel: IStatsTelPasado) {
      responseHandler.loading(true);
      try {
        telDetails.value = await $telfModule.find(_tel.id);
        sobregiro.value = _tel.dif;
        popup.value = true;
      } catch (error) { responseHandler.axiosError(error); }
      responseHandler.loading(false);
    }

    function onSearchOk(_resp: IStatsTelPasado[]) {
      telsPasados.value = _resp;
      searchDialog.value = false;
    }

    return {
      popup, reportDialog, searchDialog, sobregiro, telDetails, telsPasados, onDbClick, onSearchOk
    }
  }
});
</script>