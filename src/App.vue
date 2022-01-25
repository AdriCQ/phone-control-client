<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { appModule, appModuleKey, telModule, telModuleKey, userModule, userModuleKey, entidadModule, entidadModuleKey, facturaModuleKey, facturaModule } from 'src/modules';
/**
 * App
 */
export default defineComponent({
  name: 'App',
  setup() {
    provide(appModuleKey, appModule);
    provide(telModuleKey, telModule);
    provide(userModuleKey, userModule);
    provide(entidadModuleKey, entidadModule);
    provide(facturaModuleKey, facturaModule);

  }
})
</script>
