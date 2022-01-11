<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { appModule, appModuleKey } from 'src/modules';
/**
 * App
 */
export default defineComponent({
  name: 'App',
  setup() {
    provide(appModuleKey, appModule);
  }
})
</script>
