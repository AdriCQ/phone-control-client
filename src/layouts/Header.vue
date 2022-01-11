<template>
  <q-header elevated class="bg-primary" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>Gestión de Telefonía</q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab label="Label1" />
      <q-route-tab label="Label2" />
      <q-route-tab label="Label3" />
    </q-tabs>
  </q-header>
</template>

<script lang='ts'>
import { appModuleKey, injectStrict } from 'src/modules';
import { defineComponent } from 'vue';
/**
 * AppHeader
 */
export default defineComponent({
  name: 'AppHeader',
  setup() {
    const $appModule = injectStrict(appModuleKey);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */

    function toggleLeftDrawer() { $appModule.toggleSidebar() }

    return {
      toggleLeftDrawer
    }
  }
});
</script>