<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Analisis</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          color="primary"
          icon="mdi-magnify"
          label="Buscar Telefonos Pasados"
          @click="searchDialog = true"
        />
      </q-card-section>
      <q-card-section>
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
    </q-card>
  </q-page>

  <q-dialog v-model="popup">
    <tel-card :tel="telDetails" :edit-enable="false" :sobregiro="sobregiro" v-if="telDetails" />
    <q-card v-else>
      <q-card-section>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="searchDialog">
    <tel-pasado-form style="min-width: 20rem;" @ok="onSearchOk" />
  </q-dialog>
</template>

<script lang='ts'>
import { responseHandler } from 'src/helpers';
import { IMesYear, injectStrict, ITel, statsModulenKey, telModuleKey } from 'src/modules';
import { IStatsTelPasado } from 'src/modules/stats/types';
import { defineComponent, defineAsyncComponent, onBeforeMount, ref } from 'vue';

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
    const $stats = injectStrict(statsModulenKey);
    const $telfModule = injectStrict(telModuleKey);

    onBeforeMount(async () => {
      try {
        const telsPasadosParam: IMesYear = {
          mes: new Date().getMonth(),
          year: new Date().getFullYear()
        }
        telsPasados.value = await $stats.telsPasados(telsPasadosParam);
      } catch (error) {
        responseHandler.axiosError(error);
      }
    });
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */

    const popup = ref(false);
    const searchDialog = ref(false);
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
      popup, searchDialog, sobregiro, telDetails, telsPasados, onDbClick, onSearchOk
    }
  }
});
</script>