<template>
  <q-drawer
    @update:model-value="updateSidebarOpen"
    :model-value="sidebarOpen"
    show-if-above
    side="left"
    :width="320"
    v-if="isAuth"
  >
    <!-- profile -->
    <div class="text-center q-mt-md">
      <div class="text-grey-9 text-body1">{{ userName }}</div>
    </div>
    <!-- / profile -->
    <!-- list -->
    <div class="q-gutter-sm q-mt-md">
      <q-list class="rounded-borders" style="max-width: 300px">
        <!-- HOME -->
        <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-home" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Inicio</q-item-label>
          </q-item-section>
        </q-item>
        <!-- / HOME -->
        <!-- Phone List Group -->
        <phone-drawer-list />
        <!-- / Phone List Group -->

        <!-- business List Group -->
        <business-drawer-list />
        <!-- / business List Group -->

        <!-- plans List Group -->
        <plans-drawer-list />
        <!-- / plans List Group -->

        <!-- profile List Group -->
        <profile-drawer-list />
        <!-- / profile List Group -->
      </q-list>
    </div>
  </q-drawer>
</template>

<script lang='ts'>
import { appModuleKey, injectStrict, userModuleKey } from 'src/modules';
import { ROUTE_NAME } from 'src/router';
import { computed, defineAsyncComponent, defineComponent } from 'vue';
/**
 * ClientDrawer
 */
export default defineComponent({
  name: 'LeftDrawer',
  components: {
    'business-drawer-list': defineAsyncComponent(() => import('src/components/layout/BusinessDrawerList.vue')),
    'phone-drawer-list': defineAsyncComponent(() => import('src/components/layout/PhoneDrawerList.vue')),
    'plans-drawer-list': defineAsyncComponent(() => import('src/components/layout/PlansDrawerList .vue')),
    'profile-drawer-list': defineAsyncComponent(() => import('src/components/layout/ProfileDrawerList.vue')),
  },
  setup() {
    // Init Store
    const $appModule = injectStrict(appModuleKey);
    const $userModule = injectStrict(userModuleKey);
    // Data
    const sidebarOpen = computed(() => $appModule.sidebarOpen);
    const userName = computed(() => $userModule.profile.nombre);
    // const userNick = computed(() => $userModule.profile.nick);
    const isAuth = computed(() => $userModule.isAuth);
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * updateSidebarOpen
     */
    function updateSidebarOpen(_open: boolean) { $appModule.sidebarOpen = _open }

    return {
      // Data
      sidebarOpen, ROUTE_NAME, userName, isAuth,
      // Methods
      updateSidebarOpen
    }
  },
});
</script>