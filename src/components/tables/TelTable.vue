<template>
  <q-table
    title="Teléfonos"
    virtual-scroll
    :rows="data"
    :columns="TelGuideColumnFormatter(tipo, isAuth)"
    :loading="loading"
    row-key="id"
    @row-dblclick="onRowDbClick"
  />
  <q-dialog v-model="dialogDetails">
    <tel-card style="min-width: 20rem;" :tel="telDetails" v-if="telDetails" />
  </q-dialog>
</template>

<script lang='ts'>
import { LooseDictionary } from 'quasar';
import { IEntidadType, injectStrict, ITel, userModuleKey } from 'src/modules';
import { computed, defineAsyncComponent, defineComponent, PropType, ref } from 'vue';
import { TelGuideColumnFormatter } from './columnFormatter';

/**
 * TelTable
 */
export default defineComponent({
  name: 'TelTable',
  components: {
    'tel-card': defineAsyncComponent(() => import('src/components/cards/TelCard.vue')),
  },
  props: {
    data: {
      type: Array as PropType<ITel[]>,
      default: () => ([])
    },
    loading: {
      type: Boolean
    },
    tipo: {
      type: String as PropType<IEntidadType>,
      default: 'MININT'
    }
  },
  setup(_props) {
    const $userModule = injectStrict(userModuleKey);
    /**
     * -----------------------------------------
     *	DATA
     * -----------------------------------------
     */
    const isAuth = computed(() => Boolean($userModule.isAuth));
    const dialogDetails = ref(false);
    const filter = ref('');
    const telDetails = ref<ITel | null>(null);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function onRowDbClick(_event: LooseDictionary, _row: LooseDictionary) {
      const tel = _row as ITel;
      telDetails.value = tel;
      dialogDetails.value = true;
    }

    return {
      ..._props, isAuth, TelGuideColumnFormatter, dialogDetails, filter, telDetails,
      // Methods
      onRowDbClick
    }
  }
});
</script>