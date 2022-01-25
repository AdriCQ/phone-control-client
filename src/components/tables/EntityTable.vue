<template>
  <q-table
    title="Entidades"
    virtual-scroll
    :rows="data"
    :columns="EntityGuideColumnFormatter()"
    row-key="id"
    @row-dblclick="onRowDbClick"
  />
  <!-- <q-dialog v-model="dialogDetails">
    <tel-card style="min-width: 20rem;" :tel="telDetails" v-if="telDetails" />
  </q-dialog>-->
</template>

<script lang='ts'>
import { LooseDictionary } from 'quasar';
import { IEntidad } from 'src/modules';
import { defineComponent, PropType, ref } from 'vue';
import { EntityGuideColumnFormatter } from './columnFormatter';

/**
 * EntityTable
 */
export default defineComponent({
  name: 'EntityTable',
  props: {
    data: {
      type: Array as PropType<IEntidad[]>,
      default: () => ([])
    },
  },
  setup(_props) {
    /**
     * -----------------------------------------
     *	DATA
     * -----------------------------------------
     */
    const dialogDetails = ref(false);
    const filter = ref('');
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    function onRowDbClick(_event: LooseDictionary, _row: LooseDictionary) {
      console.log({ _event, _row })
      dialogDetails.value = true;
    }

    return {
      ..._props, EntityGuideColumnFormatter, dialogDetails, filter,
      // Methods
      onRowDbClick
    }
  }
});
</script>