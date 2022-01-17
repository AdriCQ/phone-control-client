<template>
  <q-page padding>
    <telsearch-form />
  </q-page>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent } from 'vue';

/**
 * IndexTel
 */
export default defineComponent({
  name: 'IndexTel',
  components: {
    'telsearch-form': defineAsyncComponent(() => import('src/components/forms/TelSearch.vue'))
  },
});
</script>