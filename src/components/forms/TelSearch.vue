<template>
  <q-card>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-11">
          <q-input v-model="form.search" outlined dense type="search" label="Buscar Teléfono" />
        </div>
        <div class="col-1">
          <q-btn color="primary" icon="mdi-magnify" type="subumit" />
        </div>
        <div class="col-12">
          <div class="q-gutter-sm">
            <!-- <q-radio v-model="form.type" val="global" label="Todo" /> -->
            <q-radio v-model="form.type" val="departamento" label="Unidad" />
            <q-radio v-model="form.type" val="tel" label="Teléfono" />
            <q-radio v-model="form.type" val="cargo" label="Cargo" />
            <q-radio v-model="form.type" val="entidad" label="Organo" />
            <q-radio v-model="form.type" val="lugar" label="Lugar" />
          </div>
        </div>
      </q-card-section>
    </q-form>

    <q-card-section v-if="tels.length">
      <tels-table :data="tels" :loading="loading" :key="`search-${searchKey}`" />
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { AxiosError } from 'axios';
import { responseHandler } from 'src/helpers';
import { injectStrict, ITel, ITelSearch, telModuleKey } from 'src/modules';
import { defineAsyncComponent, defineComponent, ref } from 'vue';

/**
 * TelSearchForm
 */
export default defineComponent({
  name: 'TelSearchForm',
  components: {
    'tels-table': defineAsyncComponent(() => import('src/components/tables/TelTable.vue'))
  },
  setup() {
    const $telModule = injectStrict(telModuleKey);
    /**
     * -----------------------------------------
     *	Data
     * -----------------------------------------
     */
    const loading = ref(false);
    const form = ref<ITelSearch>({
      search: '',
      type: 'departamento'
    });
    const searchKey = ref(0);
    const tels = ref<ITel[]>([]);
    /**
     * onSubmit
     */
    async function onSubmit() {
      responseHandler.loading();
      tels.value = [];
      searchKey.value++;
      try {
        tels.value = await $telModule.searchTels(form.value);
        console.log('Search', tels.value)
      } catch (error) {
        responseHandler.axiosError(error as AxiosError);
      }
      responseHandler.loading(false);
    }

    return {
      loading, form, searchKey, tels,
      onSubmit
    }
  }
});
</script>