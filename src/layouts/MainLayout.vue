<template>
  <q-layout view="lHh LpR ffr">
    <app-header />
    <q-page-container class="text-grey-9">
      <router-view />
    </q-page-container>

    <!-- leftDrawer -->
    <left-drawer />
    <!-- / leftDrawer -->

    <!-- Footer -->
    <app-footer />
    <!-- / Footer -->
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount } from 'vue';
import AppHeader from './Header.vue';
import AppFooter from './Footer.vue';
import LeftDrawer from './LeftDrawer.vue';
import { injectStrict } from 'src/modules';
import { entidadModuleKey } from 'src/modules/entidad';
/**
 * MainLayout Component
 */
export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter,
    LeftDrawer,
  },
  setup() {
    const $entModule = injectStrict(entidadModuleKey);

    onBeforeMount(() => {
      void $entModule.loadEntidades(true);
      void $entModule.loadLugares();
    })
  }
});
</script>