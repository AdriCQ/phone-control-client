<template>
  <q-header elevated class="bg-primary" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" v-if="isAuth" />
      <q-btn dense flat round icon="mdi-home" @click="goHome" v-else />

      <q-toolbar-title>Gestión Telefónica</q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left" inline-label v-if="isAuth">
      <q-route-tab icon="mdi-phone" :to="{ name: ROUTE_NAME.PHONE_HOME }" exact label="Teléfonos" />
      <q-route-tab icon="mdi-store" :to="{ name: ROUTE_NAME.ENTITY_HOME }" exact label="Entidades" />
      <q-route-tab icon="mdi-newspaper" exact label="Planes" />
      <q-route-tab
        icon="mdi-newspaper"
        :to="{ name: ROUTE_NAME.FACTURA_HOME }"
        exact
        label="Facturas"
      />
    </q-tabs>
  </q-header>
</template>

<script lang='ts'>
import { appModuleKey, injectStrict, userModuleKey } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
/**
 * AppHeader
 */
export default defineComponent({
  name: 'AppHeader',
  setup() {
    const $appModule = injectStrict(appModuleKey);
    const $userModule = injectStrict(userModuleKey);
    const $router = useRouter();

    const isAuth = computed(() => $userModule.isAuth);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */

    function toggleLeftDrawer() { $appModule.toggleSidebar() }
    function goHome() { void $router.push({ name: ROUTE_NAME.MAIN }) }

    return {
      toggleLeftDrawer, ROUTE_NAME, isAuth, goHome
    }
  }
});
</script>