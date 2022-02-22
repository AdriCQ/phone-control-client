<template>
  <q-card class="cursor-pointer">
    <q-card-section>
      <div class="text-subtitle2">
        <q-icon name="mdi-phone" />
        {{ telf.telf }}
      </div>
      <div class="text-subtitle2 text-negative">
        <q-icon name="mdi-cash" />
        ${{ Number(telf.dif).toFixed(2) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang='ts'>
import { IStatsTelPasado } from 'src/modules/stats/types';
import { defineComponent, PropType } from 'vue'

/**
 * TelPasadoCard
 */
export default defineComponent({
  name: 'TelPasadoCard',
  props: {
    telf: {
      type: Object as PropType<IStatsTelPasado>,
      required: true
    }
  }
});
</script>