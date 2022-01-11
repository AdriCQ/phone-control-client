<template>
  <q-layout view="lHh LpR ffr">
    <app-header />
    <q-page-container>
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
import { defineComponent } from 'vue';
import AppHeader from './Header.vue';
import AppFooter from './Footer.vue';
import LeftDrawer from './LeftDrawer.vue';
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
});
</script>