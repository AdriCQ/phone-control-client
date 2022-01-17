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
          <div class="q-gutter-sm" v-if="form.type !== 'tel'">
            <!-- <q-radio v-model="form.type" val="global" label="Todo" /> -->
            <q-radio v-model="form.type" val="tel" label="Teléfono" />
            <q-radio v-model="form.type" val="cargo" label="Cargo" />
            <q-radio v-model="form.type" val="departamento" label="Unidad" />
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
import { injectStrict, ITel, ITelSearch, telModuleKey } from 'src/modules';
import { defineAsyncComponent, defineComponent, ref, watch } from 'vue';

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
      type: 'tel'
    });
    const searchKey = ref(0);
    const tels = ref<ITel[]>([]);

    watch(() => form.value.search, _val => {
      if (form.value.type === 'tel' && isNaN(Number(_val))) {
        form.value.type = 'cargo';
      }
    });
    /**
     * onSubmit
     */
    async function onSubmit() {
      loading.value = true;
      tels.value = [];
      searchKey.value++;
      try {
        tels.value = await $telModule.searchTels(form.value);
      } catch (error) {
        console.log(error)
      }
      loading.value = false;
    }

    return {
      loading, form, searchKey, tels,
      onSubmit
    }
  }
});
</script>