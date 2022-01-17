<template>
  <q-expansion-item class="text-grey-9">
    <template v-slot:header>
      <q-item-section avatar top>
        <q-avatar size="md" icon="mdi-newspaper" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Planes</q-item-label>
      </q-item-section>
    </template>
    <q-list class="q-pl-lg">
      <!-- Yearly -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-calendar" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Anual</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Yearly -->

      <!-- organ -->
      <q-item clickable v-ripple :to="{ name: ROUTE_NAME.MAIN }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-cube-outline" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-grey-9">Órgano</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / organ -->
    </q-list>
  </q-expansion-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { ROUTE_NAME } from 'src/router';
/**
 * PlansDrawerList
 */
export default defineComponent({
  name: 'PlansDrawerList',
  setup() {
    return {
      ROUTE_NAME
    }
  }
});
</script>