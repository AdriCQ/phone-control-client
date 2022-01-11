<template>
  <q-drawer
    @update:model-value="updateSidebarOpen"
    show-if-above
    :mini="sidebarOpen"
    side="left"
    :width="280"
  >
    <!-- list -->
    <div class="q-gutter-sm">
      <q-list class="rounded-borders" style="max-width: 300px">
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-phone" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section class="text-grey-9">
            <q-item-label lines="1">Label</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<script lang='ts'>
import { appModuleKey, injectStrict } from 'src/modules';
import { computed, defineComponent } from 'vue';
/**
 * ClientDrawer
 */
export default defineComponent({
  name: 'LeftDrawer',
  setup() {
    // Init Store
    const $appModule = injectStrict(appModuleKey);
    // Data
    const sidebarOpen = computed(() => $appModule.sidebarOpen);
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
      sidebarOpen,
      // Methods
      updateSidebarOpen
    }
  },
});
</script>