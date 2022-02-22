<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Facturas</div>
      </q-card-section>
      <q-card-section>
        <q-btn color="primary" icon="mdi-plus" label="Nueva" @click="newFactDialog = true" />
      </q-card-section>
      <q-card-section v-if="facturas.length">
        <facturas-table :data="facturas" @dbclick="onFacturaDbClick" />
      </q-card-section>
    </q-card>

    <!-- Upload Factura Dialog -->
    <q-dialog v-model="newFactDialog">
      <upload-factura-form
        v-if="newFactDialog"
        style="min-width: 20rem;"
        @uploaded="onFacturaUploaded"
      />
    </q-dialog>
    <!-- / Upload Factura Dialog -->

    <!-- facrura Selector Dialog -->
    <q-dialog v-model="facturaSelectorDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- / facrura Selector Dialog -->
  </q-page>
</template>

<script lang='ts'>
import { responseHandler } from 'src/helpers';
import { facturaModuleKey, IFactura, injectStrict } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { defineAsyncComponent, defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * facturaIndexPage
 */
export default defineComponent({
  name: 'facturaIndexPage',
  components: {
    'facturas-table': defineAsyncComponent(() => import('src/components/tables/FacturaTable.vue')),
    'upload-factura-form': defineAsyncComponent(() => import('src/components/forms/UploadFactura.vue'))
  },
  setup() {
    const $facturaModule = injectStrict(facturaModuleKey);
    const $router = useRouter();
    onBeforeMount(() => {
      $facturaModule.list().then(_f => { facturas.value = _f }).catch(_e => { console.log(_e) });
    })
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */

    const newFactDialog = ref(false);
    const facturaSelectorDialog = ref(false);
    const facturaSelectorCsv = ref<string[]>(['Todas']);
    const facturas = ref<IFactura[]>([]);

    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    async function onFacturaDbClick(_fact: IFactura) {
      facturaSelectorCsv.value = ['Todas'];
      responseHandler.loading();
      try {
        const resp = await $facturaModule.find(_fact.id);
        facturaSelectorCsv.value.push(...resp);

      } catch (error) {
        responseHandler.axiosError(error);
      }
      responseHandler.loading(false);

    }
    function onFacturaUploaded() {
      $facturaModule.list().then(_f => { facturas.value = _f }).catch(_e => { console.log(_e) });
      newFactDialog.value = false;
      void $router.push({ name: ROUTE_NAME.MAIN })
    }

    return {
      facturas, newFactDialog, facturaSelectorDialog, facturaSelectorCsv,
      // Methods
      onFacturaDbClick, onFacturaUploaded
    }

  }
});
</script>