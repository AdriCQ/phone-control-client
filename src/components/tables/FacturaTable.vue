<template>
  <q-table
    virtual-scroll
    :rows="data"
    :columns="FacturaColumnFormatter"
    row-key="id"
    @row-dblclick="onRowDbClick"
  />
</template>

<script lang='ts'>
import { LooseDictionary } from 'quasar';
import { IFactura } from 'src/modules';
import { defineComponent, PropType } from 'vue';
import { FacturaColumnFormatter } from './columnFormatter'
/**
 * FacturaTable
 */
export default defineComponent({
  name: 'FacturaTable',
  props: {
    data: {
      type: Array as PropType<IFactura[]>,
      default: () => ([])
    },
  },
  emits: ['dbclick'],
  setup(_props, $ctx) {

    function onRowDbClick(_event: LooseDictionary, _row: LooseDictionary) {
      $ctx.emit('dbclick', _row);
    }

    return { FacturaColumnFormatter, onRowDbClick }
  }
});
</script>