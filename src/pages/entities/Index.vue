<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Órganos / Empresas</div>
      </q-card-section>
      <q-card-section>
        <!-- <entity-table :data="" -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang='ts'>
import { AxiosError } from 'axios';
import { responseHandler } from 'src/helpers';
import { entidadModuleKey, injectStrict } from 'src/modules';
import { defineComponent, onBeforeMount } from 'vue';

/**
 * EntitiesIndexPage
 */
export default defineComponent({
  name: 'EntitiesIndexPage',
  components: {
    // 'entity-table':defineAsyncComponent(()=>import('src/components/tables/EntityTable.vue'))
  },
  setup() {
    const $entitiModule = injectStrict(entidadModuleKey);

    onBeforeMount(async () => {
      responseHandler.loading(true);
      try {
        await $entitiModule.loadLugares();
      } catch (error) { responseHandler.axiosError(error as AxiosError); }
      responseHandler.loading(false);
    })
  }
});
</script>